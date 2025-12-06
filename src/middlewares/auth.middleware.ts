import { Elysia } from "elysia";
// ตรวจสอบ path import ให้ถูกต้อง
import { sessionPlugin } from "../modules/v1/auth/session";
import { logger } from "../utils/logger";
import { fail } from "../utils/response";

export const isAuthenticated = new Elysia({ name: "middleware.isAuthenticated" })
  .use(sessionPlugin)
  // ย้าย Logic การเช็คมาไว้ใน derive เลย จะได้ทั้ง User และ Guard ในตัวเดียว
  .derive({ as: "scoped" }, ({ session, error }) => {
    if (!session) {
       logger.error("Session missing");
       throw { message: "Session Unavailable" }; // error(500, fail("Internal Server Error", "Session Unavailable"));
    }

    if (!session.userId) {
       throw { code: "UNAUTHORIZED", message: "Unauthorized" };
    }

    return {
      user: {
        id: session.userId
      }
    };
  });

