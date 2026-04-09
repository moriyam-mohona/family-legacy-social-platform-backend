import { PrismaClient, Prisma } from "@prisma/client";
import ApiError from "../../../errors/apiError.js";

const prisma = new PrismaClient();

const getMe = async (userAuth: any) => {
  const user = await prisma.user.findUnique({
    where: { email: userAuth.email },
    select: {
      id: true,
      name: true,
      email: true,
      gender: true,
      dob: true,
      phone: true,
      image: true,
      role: true,
      citizenship: true,
      educationDetails: true,
      relationshipStatus: true,
      workStatus: true,
      fatherName: true,
      fatherMobile: true,
      fatherEmail: true,
      fatherDob: true,
      motherName: true,
      motherMobile: true,
      motherEmail: true,
      motherDob: true,
      referralCode: true,
      isVerified: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user || user.isDeleted) throw new ApiError(404, "User not found");

  return user;
};

const updateProfile = async (userAuth: any, payload: Partial<Prisma.UserUpdateInput>) => {
  const user = await prisma.user.findUnique({
    where: { email: userAuth.email },
  });

  if (!user || user.isDeleted) throw new ApiError(404, "User not found");
  
  if (payload.dob && typeof payload.dob === 'string') payload.dob = new Date(payload.dob);
  if (payload.fatherDob && typeof payload.fatherDob === 'string') payload.fatherDob = new Date(payload.fatherDob);
  if (payload.motherDob && typeof payload.motherDob === 'string') payload.motherDob = new Date(payload.motherDob);

  const updatedUser = await prisma.user.update({
    where: { email: user.email },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      gender: true,
      dob: true,
      phone: true,
      image: true,
      citizenship: true,
      educationDetails: true,
      relationshipStatus: true,
      workStatus: true,
      fatherName: true,
      fatherMobile: true,
      fatherEmail: true,
      fatherDob: true,
      motherName: true,
      motherMobile: true,
      motherEmail: true,
      motherDob: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

const deleteMyAccount = async (userAuth: any) => {
  const user = await prisma.user.findUnique({
    where: { email: userAuth.email },
  });

  if (!user) throw new ApiError(404, "User not found");

  await prisma.user.delete({
    where: { email: user.email },
  });

  return null;
};

const getAllUsers = async (query: any) => {
  const { searchTerm, page = 1, limit = 10 } = query;
  const skip = (Number(page) - 1) * Number(limit);

  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: searchTerm as string, mode: "insensitive" } },
        { email: { contains: searchTerm as string, mode: "insensitive" } },
      ],
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const users = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: Number(limit),
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isVerified: true,
      isDeleted: true,
      createdAt: true,
    },
  });

  const total = await prisma.user.count({ where: whereConditions });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: users,
  };
};

const deleteUserByAdmin = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new ApiError(404, "User not found");

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { isDeleted: !user.isDeleted }, // toggle delete status
    select: {
      id: true,
      email: true,
      isDeleted: true,
    },
  });

  return updatedUser;
};

export const UserService = {
  getMe,
  updateProfile,
  deleteMyAccount,
  getAllUsers,
  deleteUserByAdmin,
};
