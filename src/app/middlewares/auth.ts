import { NextFunction, Request, Response } from "express";
import config from "../../config/index.js";
import ApiError from "../../errors/apiError.js";
import { jwtHelpers } from "../../utils/jwtHelpers.js";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(401, "You are not authorized!!");
      }

      const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.jwt_secret);

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(401, "Forbidden!");
      }

      req.user = verifiedUser;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
