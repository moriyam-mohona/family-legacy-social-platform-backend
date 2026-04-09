import { z } from "zod";
import { CitizenshipType, RelationshipStatus, Role } from "@prisma/client";

const registerUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    gender: z.string().min(1, "Gender is required"),
    dob: z.string().datetime().or(z.date().transform((d) => d.toISOString())),
    phone: z.string().optional(),
    image: z.string().optional(),
    referralCode: z.string().optional(),
    citizenship: z.nativeEnum(CitizenshipType).optional(),
    educationDetails: z.string().optional(),
    relationshipStatus: z.nativeEnum(RelationshipStatus).optional(),
    workStatus: z.string().optional(),
  }),
});

const verifyOtpSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    otp: z.string().length(6, "OTP must be 6 digits"),
    type: z.enum(["CREATE_ACCOUNT", "FORGET_PASSWORD"]),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string(),
  }),
});

const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
  }),
});

const resetPasswordSchema = z.object({
  body: z.object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const AuthValidation = {
  registerUserSchema,
  verifyOtpSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
};
