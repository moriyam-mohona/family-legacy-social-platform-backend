import express from "express";
import { UserController } from "./user.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { UserValidation } from "./user.validation.js";
import auth from "../../middlewares/auth.js";
import { Role } from "@prisma/client";

const router = express.Router();

router.get(
  "/me",
  auth(Role.USER, Role.ADMIN),
  UserController.getMe
);

router.patch(
  "/me",
  auth(Role.USER, Role.ADMIN),
  validateRequest(UserValidation.updateProfileSchema),
  UserController.updateProfile
);

router.delete(
  "/me",
  auth(Role.USER, Role.ADMIN),
  UserController.deleteMyAccount
);

// Admin Only Routes
router.get(
  "/",
  auth(Role.ADMIN),
  UserController.getAllUsers
);

router.delete(
  "/:id",
  auth(Role.ADMIN),
  UserController.deleteUserByAdmin
);

export const UserRoutes = router;
