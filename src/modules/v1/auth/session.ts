import { Elysia } from "elysia";
import { client } from "../../../config/redis"; 
import { logger } from "../../../utils/logger";

export const sessionPlugin = new Elysia({
  name: "session",
})
  .derive(async ({ cookie: { session } }) => {
    const sessionId = session?.value;
    let userId: string | null = null;
    // ✅ 2. เช็คว่ามี sessionId จริงๆ ค่อยไปถาม Redis
    if (sessionId) {
      try {
        userId = await client.get(`session:${sessionId}`);
      } catch (err) {
        console.error("Redis Error:", err);
        // กรณี Redis ล่ม ให้ถือว่า user ยังไม่ login
        userId = null; 
      }
    }
    
    // ✅ 3. Return Object 'session' ออกไปเสมอ (แม้ userId จะเป็น null)
    return {
      session: {
        userId: userId ? parseInt(userId) : null,
        
        login: async (id: number) => {
          const newSessionId = crypto.randomUUID();
          await client.set(
            `session:${newSessionId}`,
            id.toString(),
            "EX",
            60 * 60 * 24 * 1
          );

          // ตรวจสอบว่า session cookie object มีอยู่จริงไหม ถ้าไม่มีให้สร้างใหม่ (Elysia จัดการให้ แต่กันเหนียว)
          if (session) {
            session.set({
              value: newSessionId,
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              path: "/",
              maxAge: 60 * 60 * 24 * 1,
            });
          }
        },

        logout: async () => {
          if (sessionId) {
            await client.del(`session:${sessionId}`);
          }
          session?.remove();
        }
      }
    };
  });