import { Elysia, t } from "elysia";
import { AuthController } from "./auth.controller";
import { isAuthenticated } from "../../../middlewares/auth.middleware";
import { UserPlainInputCreate } from "../../../generated/prismabox/User";
import cookie from "@elysiajs/cookie";
const authController = new AuthController();

export const authLocalRoutes = new Elysia()
  // .use(cookie())
  // no middleware
  .post("/register", authController.createUser, {
    body: UserPlainInputCreate,
  })

  .post("/login", authController.loginLocal, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  })

  .post("/logout", ({ cookie }) => {
    cookie.session?.remove();
  });
