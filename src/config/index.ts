import dotenv from 'dotenv';
import path from 'path';
import { Secret, SignOptions } from "jsonwebtoken";

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  password_salt: process.env.PASSWORD_SALT || "12",
  emailSender: {
    email: process.env.EMAIL_SENDER_EMAIL || "",
    app_pass: process.env.EMAIL_SENDER_APP_PASS || "",
  },
    jwt: {
    jwt_secret: process.env.JWT_SECRET as Secret,
    expires_in: process.env.EXPIRES_IN as SignOptions["expiresIn"],
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET as Secret,
    refresh_token_expires_in: process.env
      .REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
    reset_password_secret: process.env.RESET_PASS_TOKEN as Secret,
    reset_password_expires_in: process.env
      .RESET_PASS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  },
  backend_url: process.env.BACKEND_URL,
};
