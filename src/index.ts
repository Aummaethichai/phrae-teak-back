import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { config } from "dotenv";
import { logger } from "./utils/logger";
import v1Routes from "./modules/v1/v1_index";
import { errorHandler } from "./utils/errorHandler";
// Core Middlewares & Plugins
// import { authMiddleware } from './core/middlewares/auth';

// Feature Modules
// import { authRoutes } from './modules/auth/auth.routes';
// import { productRoutes } from './modules/products/product.routes';
// import { cartRoutes } from './modules/cart/cart.routes';

// import './config/redis' // คุณสามารถเปิดใช้งานส่วนนี้เมื่อพร้อม

config();
const port = process.env.APP_ENV === "production" ? (process.env.PORT ?? "8080") : "8080";

const app = new Elysia()
  // .onError(({ code, error }) => {
  //   console.log('Global error:', error)
  //   return {
  //     message: error.message,
  //     code
  //   }
  // })
  .use(
    // cors()
    cors({
      origin: process.env.FRONTEND_URL ?? "http://localhost:8080",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  ) // Plugin สำหรับจัดการ Cross-Origin Resource Sharing
  .use(errorHandler) // Centralized error handler, should be registered early
  // .use(authMiddleware) // Middleware หลักสำหรับตรวจสอบ user (จะสร้างในขั้นตอนถัดไป)
  .use(v1Routes);

app.listen(port);
logger.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
