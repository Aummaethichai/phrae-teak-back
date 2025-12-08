import { Elysia } from "elysia";

import { config } from "dotenv";
import { logger } from "./utils/logger";
import v1Routes from "./modules/v1/v1_index";
import cookie from "@elysiajs/cookie";
import { corePlugin } from "./plugins/cors.plugin";

config();
const port =
  process.env.APP_ENV === "production" ? (process.env.PORT ?? "8080") : "8080";

const app = new Elysia()
  // .onError(({ code, error }) => {
  //   console.log('Global error:', error)
  //   return {
  //     message: error.message,
  //     code
  //   }
  // })
  .use(corePlugin)
  .use(cookie())
  .use(v1Routes);

app.listen(port);
logger.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
