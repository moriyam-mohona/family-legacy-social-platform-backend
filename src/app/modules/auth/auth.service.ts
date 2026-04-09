import { PrismaClient, Role } from "@prisma/client";
import config from "../../../config/index.js";
import ApiError from "../../../errors/apiError.js";
import emailSender from "../../../helpers/email_sender/emailSender.js";
import { jwtHelpers } from "../../../utils/jwtHelpers.js";
import { generateOTP } from "../../../utils/generateOtp.js";
import { otpEmail } from "../../../shared/emails/otpEmail.js";
import { compareItem, hashItem } from "../../../utils/hashAndCompareItem.js";

const prisma = new PrismaClient();

const registerUser = async (payload: any) => {
  const isExist = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (isExist && isExist.isVerified) {
    throw new ApiError(400, "User already exists and verified");
  } else if (isExist && !isExist.isVerified) {
    await prisma.user.delete({ where: { email: payload.email } });
  }

  const hashedPassword = await hashItem(payload.password);
  payload.password = hashedPassword;
  
  if (payload.dob) {
    payload.dob = new Date(payload.dob);
  }

  const user = await prisma.user.create({
    data: payload,
  });

  // Delete previous OTP if any
  await prisma.oTP.deleteMany({
    where: { email: payload.email, type: "CREATE_ACCOUNT" },
  });

  const generatedOtp = generateOTP();

  await prisma.oTP.create({
    data: {
      email: payload.email,
      otp: generatedOtp,
      type: "CREATE_ACCOUNT",
      expiresAt: new Date(Date.now() + 10 * 60000), // 10 minutes from now
    },
  });

  try {
    await emailSender("Account Verification OTP", payload.email, otpEmail(generatedOtp));
  } catch (err: any) {
    console.error("Failed to send email", err);
  }

  return { message: "User registered. Please verify OTP sent to your email." };
};

const verifyOtp = async (payload: { email: string; otp: string; type: string }) => {
  const isOtpValid = await prisma.oTP.findFirst({
    where: {
      email: payload.email,
      otp: payload.otp,
      type: payload.type,
      expiresAt: { gt: new Date() },
    },
  });

  if (!isOtpValid) throw new ApiError(400, "Invalid or expired OTP");

  await prisma.oTP.delete({ where: { id: isOtpValid.id } });

  const user = await prisma.user.findUnique({ where: { email: payload.email } });
  
  if (!user) throw new ApiError(404, "User not found");

  if (payload.type === "CREATE_ACCOUNT") {
    await prisma.user.update({
      where: { email: payload.email },
      data: { isVerified: true },
    });

    const accessToken = jwtHelpers.generateToken(
      { email: user.email, role: user.role, id: user.id },
      config.jwt.jwt_secret,
      config.jwt.expires_in
    );

    const refreshToken = jwtHelpers.generateToken(
      { email: user.email, role: user.role, id: user.id },
      config.jwt.refresh_token_secret,
      config.jwt.refresh_token_expires_in
    );

    return { accessToken, refreshToken, user };
  } else if (payload.type === "FORGET_PASSWORD") {
    const resetToken = jwtHelpers.generateToken(
      { email: user.email, role: user.role, id: user.id },
      config.jwt.reset_password_secret,
      config.jwt.reset_password_expires_in
    );

    return { resetToken };
  }
};

const login = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) throw new ApiError(404, "User does not exist");
  if (user.isDeleted) throw new ApiError(403, "User account is deleted");
  if (!user.isVerified) throw new ApiError(403, "User is not verified");

  const isPasswordValid = await compareItem(payload.password, user.password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid password");

  const accessToken = jwtHelpers.generateToken(
    { email: user.email, role: user.role, id: user.id },
    config.jwt.jwt_secret,
    config.jwt.expires_in
  );

  const refreshToken = jwtHelpers.generateToken(
    { email: user.email, role: user.role, id: user.id },
    config.jwt.refresh_token_secret,
    config.jwt.refresh_token_expires_in
  );

  return { accessToken, refreshToken, user };
};

const forgotPassword = async (payload: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email, isDeleted: false },
  });

  if (!user) throw new ApiError(404, "User not found");

  await prisma.oTP.deleteMany({
    where: { email: payload.email, type: "FORGET_PASSWORD" },
  });

  const generatedOtp = generateOTP();

  await prisma.oTP.create({
    data: {
      email: payload.email,
      otp: generatedOtp,
      type: "FORGET_PASSWORD",
      expiresAt: new Date(Date.now() + 10 * 60000),
    },
  });

  await emailSender("Password Reset OTP", user.email, otpEmail(generatedOtp));

  return null;
};

const resetPassword = async (token: string, newPassword: string) => {
  const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.reset_password_secret);

  if (!verifiedUser) throw new ApiError(401, "Invalid token");

  const user = await prisma.user.findUnique({
    where: { email: verifiedUser.email },
  });

  if (!user || user.isDeleted) throw new ApiError(404, "User not found");

  const hashedPassword = await hashItem(newPassword);

  await prisma.user.update({
    where: { email: user.email },
    data: { password: hashedPassword },
  });

  return null;
};

const changePassword = async (userAuth: any, payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email: userAuth.email },
  });

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await compareItem(payload.oldPassword, user.password);
  if (!isPasswordValid) throw new ApiError(401, "Old password is incorrect");

  const hashedPassword = await hashItem(payload.newPassword);

  await prisma.user.update({
    where: { email: user.email },
    data: { password: hashedPassword },
  });

  return null;
};

export const AuthService = {
  registerUser,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
};
