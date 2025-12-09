import { Context, Elysia, t } from "elysia";
import { AuthService } from "./auth.service";
import {
  UserPlainInputCreate,
} from "../../../generated/prismabox/User";
import { logger } from "../../../utils/logger";
import { createSession, ElysiaCookie } from "./session.service";
import { apiResponse } from "../../../utils/response";

export class AuthController {
  private authService = AuthService;

  createUser = async ({
    body,
    cookie,
    set,
  }: {
    body: typeof UserPlainInputCreate.static;
    cookie: any;
    set: Context['set']
  }) => {
    try {
      const check_user = await this.authService.CheckUser(body.email);

      if (check_user) {
        return apiResponse.badRequest(set, "มีผู้ใช้นี้ในระบบแล้ว กรุณาใช้อีเมลอื่น");
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

      return apiResponse.created(set, {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      });
    } catch (error: any) {
      logger.error(error);
      return {
        status: "error",
        message: `${error.message}`,
      };
    }
  };

  loginLocal = async ({ body, set, cookie }: Context) => {
    try {
      const { email, password } = body as any;
      const user = await this.authService.verifyUser(email, password);

      if (!user) {
        set.status = 401;
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
        cookie as unknown as ElysiaCookie
      );

      set.status = 200;
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
      return { status: "error", message: "เกิดข้อผิดพลาดบางอย่าง" };
    }
  };
}
