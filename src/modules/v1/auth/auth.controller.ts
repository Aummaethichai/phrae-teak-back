import { Elysia, t } from "elysia";
import { AuthService } from "./auth.service";
import {
  UserPlainInputCreate,
} from "../../../generated/prismabox/User";
import { logger } from "../../../utils/logger";
import { createSession } from "./session.service";

export class AuthController {
  private authService = AuthService;

  createUser = async ({
    body,
    cookie,
  }: {
    body: typeof UserPlainInputCreate.static;
    cookie: any;
  }) => {
    try {
      const check_user = await this.authService.CheckUser(body.email);

      if (check_user) {
        return {
          status: "error",
          message: "มีผู้ใช้นี้ในระบบแล้ว กรุณาใช้อีเมลอื่น",
        };
      }
      const newUser = await this.authService.createUser(body);

      await createSession(
        {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          googleId: newUser.googleId || "",
          role: newUser.role,
          profile_image: newUser.profile_image || "",
        },
        cookie
      );
      
      return {
        status: "success",
        data: newUser,
      };
    } catch (error: any) {
      logger.error(error);
      return {
        status: "error",
        message: `${error.message}`,
      };
    }
  };

  loginLocal = async({
    email,
    password,
    cookie,
  }:{
    email: string;
    password: string;
    cookie: any;
  }) => {
    try {
      const user = await this.authService.verifyUser(email, password);

      if (!user) {
        return {
          status: "error",
          message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
        };
      }
      await createSession(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          googleId: user.googleId || "",
          role: user.role,
          profile_image: user.profile_image || "",
        },
        cookie
      );

      return {
        status: "success",
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch (error: any) {
      logger.error(error);
      // Return a generic error message to the user for security
      return { status: "error", message: "เกิดข้อผิดพลาดบางอย่าง" };
    }
  }
}
