import { randomBytes, randomUUID } from "crypto";
import { client } from "./config/redis";
import type { Cookie } from "@elysiajs/cookie";
import { InternalServerError } from "./utils/errors";
import { randomUUIDv5 } from "bun";

// กำหนดโครงสร้างข้อมูลที่จะเก็บใน session
export interface SessionPayload {
  payload: object; // หรือตามประเภท ID ของคุณ
  role?: string;
}

const SESSION_DURATION_SECONDS = 60 * 60 * 24; // 24 ชั่วโมง

/**
 * สร้าง Session ใหม่, เก็บใน Redis, และตั้งค่า Cookie
 * @param payload ข้อมูล user ที่จะเก็บใน session
 * @param cookie context.cookie จาก Elysia
 */
export async function createSession(
  payload: SessionPayload,
  cookie: Cookie<any>
) {
  if (client.status !== 'ready') {
    throw new InternalServerError(
      "Redis connection is not open. Session cannot be created."
    );
  }

  // 1. สร้าง Session ID ที่ปลอดภัยและไม่ซ้ำกัน
  const sessionId = randomUUIDv5;

  // 2. แปลงข้อมูลเป็น string เพื่อเก็บใน Redis
  const sessionData = JSON.stringify(payload);

  // 3. เก็บ Session ใน Redis พร้อมตั้งเวลาหมดอายุ
  await client.set(`session:${sessionId}`, sessionData, {
    EX: SESSION_DURATION_SECONDS,
  });

  // 4. ตั้งค่า HTTP-Only Cookie เพื่อความปลอดภัย
  cookie.session_id.set({
    value: sessionId,
    httpOnly: true,
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
    secure: process.env.NODE_ENV === "production", // ส่งผ่าน HTTPS เท่านั้นใน production
    sameSite: "lax",
  });
}

/**
 * ลบ Session ออกจาก Redis และลบ Cookie
 * @param cookie context.cookie จาก Elysia
 */
export async function deleteSession(cookie: Cookie<any>) {
  const sessionId = cookie.session_id.value;

  if (sessionId) {
    if (client.isOpen) {
      // ลบ key จาก Redis
      await client.del(`session:${sessionId}`);
    }
    // สั่งให้เบราว์เซอร์ลบ cookie
    cookie.session_id.remove();
  }
}
