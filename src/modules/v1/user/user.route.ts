import { Elysia, t } from "elysia";

import { isAuthenticated } from "../../../middlewares/auth.middleware";
import { userController } from "./user.controller";
const controller = new userController();
export const userRoutes = new Elysia({ prefix: "/user" })
    .use(isAuthenticated)
    .get("/", controller.getSessionData);