import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { UserService } from "./user.service.js";

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getMe((req as any).user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateProfile((req as any).user, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

const deleteMyAccount = catchAsync(async (req: Request, res: Response) => {
  await UserService.deleteMyAccount((req as any).user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Your account has been permanently deleted",
    data: null,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const deleteUserByAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUserByAdmin(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.isDeleted ? "User has been soft deleted" : "User has been restored",
    data: result,
  });
});


export const UserController = {
  getMe,
  updateProfile,
  deleteMyAccount,
  getAllUsers,
  deleteUserByAdmin,
};
