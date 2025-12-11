import { Context, Elysia, t } from "elysia";
import {
  ProductPlainInputCreate,
  ProductPlainInputUpdate,
} from "../../../generated/prismabox/Product";
import { logger } from "../../../utils/logger";
import { apiResponse } from "../../../utils/response";
import { userService } from "./user.service";
import { client } from "../../../config/redis";

type AuthUser = {
  user: {
    id: number;
    email: string;
    name: string;
    profile_image: string;
    role: "ADMIN" | "USER";
  };
};

type userContext = {
  set: Context["set"];
};
type createProductContext = {
  body: typeof ProductPlainInputCreate.static;
  set: Context["set"];
};

type updateProductContext = {
  params: { id: string };
  body: typeof ProductPlainInputUpdate.static;
  set: Context["set"];
};
export class userController {
  private userService = new userService();

  getSessionData = async ({ set, user}: userContext & AuthUser) => {
    try {
      // const cachedSession = await client.get(`session:${session}`)
      // const data = cachedSession ? JSON.parse(cachedSession) : null;
      // delete data.id
      // delete data.googleId
      // return apiResponse.success(set, data);
      const { id, ...safeData } = user;
        
        // 3. ส่งข้อมูลออกไป
        return apiResponse.success(set, safeData);
    } catch (error: any) {
      logger.error(error.message);
      return apiResponse.internalServerError(set, error.message);
    }
  };
}