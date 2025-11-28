import { Elysia, env } from "elysia";
import { config } from "dotenv";
config();

const app = new Elysia()
const port = process.env.APP_ENV === "production" ? (process.env.PORT ?? "8080") : "8080";
app.get("/", () => "Hello Elysia").listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
