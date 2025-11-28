import { Elysia } from "elysia";
import { config } from "dotenv";
config();

const app = new Elysia()

app.get("/", () => "Hello Elysia").listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
