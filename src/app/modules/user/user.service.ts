import prisma from '../../../lib/prisma.js';
import { IUser } from './user.interface.js';

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const createUser = async (payload: IUser) => {
  return await prisma.user.create({
    data: payload
  });
};

export const UserService = {
  getAllUsers,
  createUser
};
