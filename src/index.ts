import { Elysia } from "elysia";
import { config } from "dotenv";
import { logger } from "./utils/logger";
import v1Routes from "./modules/v1/v1_index";
import cookie from "@elysiajs/cookie";
import { corePlugin } from "./plugins/cors.plugin";
import { client } from "./config/redis";
import { apiResponse } from "./utils/response";

config();
const port =
  process.env.APP_ENV === "production" ? (process.env.PORT ?? "8080") : "8080";

const app = new Elysia()
  .use(corePlugin)
  .use(cookie())
  .onBeforeHandle(({ set }) => {
    if (client.status !== "ready") {
      logger.error(`❌ Request Blocked: Redis status is '${client.status}'`);
      
      // ส่ง 500 กลับไปทันที ไม่ทำ route ต่อ
      return apiResponse.internalServerError(
        set, 
        `System Error: Redis connection is ${client.status}`
      );
    }
  })
  .use(v1Routes);

app.listen(port);
logger.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
