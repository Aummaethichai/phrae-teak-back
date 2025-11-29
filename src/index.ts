import { Elysia, form, file } from "elysia";
import { config } from "dotenv";
import { logger } from "./utils/logger";

import './config/redis'
config();

const port = process.env.APP_ENV === "production" ? (process.env.PORT ?? "8080") : "8080";
const app = new Elysia()

// app.get("/", ({cookie : { session }}) => {
//   session.set({
//     value: 'eiei',
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production" ? true : false,
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7, // 7 วัน
//   });
// });
// app.get('/1', ({ redirect }) => {
// 		return redirect('https://youtu.be')
// 	})

// app.get('/2', () => form({
// 		name: 'Tea Party',
// 		images: [file('nagi.web'), file('mika.webp')]
// 	}))

app.listen(port);
logger.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
