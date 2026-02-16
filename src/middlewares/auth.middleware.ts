import { Elysia } from "elysia";
import { sessionPlugin } from "../modules/v1/auth/session";
import { logger } from "../utils/logger";
import { client } from "../config/redis";

export const isAuthenticated = new Elysia({
  name: "middleware.isAuthenticated",
})
  .use(sessionPlugin)
  .derive({ as: "scoped" }, async ({ cookie: { session }, set }) => {
    if (!session) {
      logger.error("Session missing or invalid");
      set.status = 401;
      throw {
        status: 401,
        message: "Unauthorized: Not Found Session",
      };
    }
    const cachedSession = await client.get(`session:${session}`);

    if (!cachedSession) {
      set.status = 401;
      session.remove();
      throw {
        status: 401,
        message: "Unauthorized: Session Expired or Not Exist in Redis",
      };
    }

    return {
      user: {
        id: session,
        ...JSON.parse(cachedSession),
      },
    };
  });

export const isAdmin = new Elysia({ name: "middleware.isAdmin" })
  .use(isAuthenticated)
  .derive({ as: "scoped" }, async ({ user, set }) => {
    if (user.role !== "ADMIN") {
      set.status = 403;
      throw {
        status: 403,
        message: "Forbidden: Admin Access Required",
      };
    }
  });
