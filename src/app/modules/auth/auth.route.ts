import express from "express";
import { AuthController } from "./auth.controller.js";
import { AuthValidation } from "./auth.validation.js";
import validateRequest from "../../middlewares/validateRequest.js";
import auth from "../../middlewares/auth.js";
import { Role } from "@prisma/client";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerUserSchema),
  AuthController.registerUser
);

router.post(
  "/verify-otp",
  validateRequest(AuthValidation.verifyOtpSchema),
  AuthController.verifyOtp
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginSchema),
  AuthController.loginUser
);

router.post(
  "/forgot-password",
  validateRequest(AuthValidation.forgotPasswordSchema),
  AuthController.forgotPassword
);

router.post(
  "/reset-password",
  validateRequest(AuthValidation.resetPasswordSchema),
  AuthController.resetPassword
);

router.patch(
  "/change-password",
  auth(Role.USER, Role.ADMIN),
  validateRequest(AuthValidation.changePasswordSchema),
  AuthController.changePassword
);

export const AuthRoutes = router;
