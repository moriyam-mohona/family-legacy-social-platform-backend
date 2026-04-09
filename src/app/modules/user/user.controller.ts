import { Request, Response } from 'express';
import { UserService } from './user.service.js';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: users
  });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = await UserService.createUser(req.body);
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

export const UserController = {
  getAllUsers,
  createUser
};
