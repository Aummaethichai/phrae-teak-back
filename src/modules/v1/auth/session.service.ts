import { client } from "../../../config/redis";
import { v4 as uuidv4 } from "uuid";
import { apiResponse } from "../../../utils/response";
import { Context } from "elysia";


// กำหนดโครงสร้างข้อมูลที่จะเก็บใน session
export interface SessionPayload {
    id: number;
    email: string;
    name: string;
    // password: string;
    googleId: string;
    role: string;
    profile_image: string;
}

export interface ElysiaCookie {
  session: { set: (options: any) => void; remove: () => void; value?: string };
}


const SESSION_DURATION_SECONDS = 60 * 60 * 24; // 24 ชั่วโมง

/**
 * สร้าง Session ใหม่, เก็บใน Redis, และตั้งค่า Cookie
 * @param payload ข้อมูล user ที่จะเก็บใน session
 * @param cookie context.cookie จาก Elysia
 */
export async function createSession(payload: SessionPayload, cookie: ElysiaCookie, set: Context['set']) {
  if (client.status !== "ready") {
    return apiResponse.internalServerError(set, "Redis connection is not open. Session cannot be created.");
  }
  // 1. สร้าง Session ID ที่ปลอดภัยและไม่ซ้ำกัน
  const sessionId = uuidv4();

  // 2. แปลงข้อมูลเป็น string เพื่อเก็บใน Redis
  const sessionData = JSON.stringify(payload);

  // 3. เก็บ Session ใน Redis พร้อมตั้งเวลาหมดอายุ
  await client.set(
    `session:${sessionId}`,
    sessionData,
    "EX",
    SESSION_DURATION_SECONDS
  );

  // 4. ตั้งค่า HTTP-Only Cookie เพื่อความปลอดภัย
  cookie.session?.set({
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
export async function deleteSession(cookie: ElysiaCookie) {
  const sessionId = cookie.session?.value;

  if (sessionId) {
    if (client.status === "ready") {
      // ลบ key จาก Redis
      await client.del(`session:${sessionId}`);
    }
    // สั่งให้เบราว์เซอร์ลบ cookie
    cookie.session?.remove();
  }
}
