import { Elysia } from "elysia";
import { prisma } from "../../../prisma";

export const googleAuth = new Elysia({ prefix: "/auth/google" })

  // Step 1: Redirect ไป Google
  .get("/login", ({ redirect }) => {
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");

    url.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
    url.searchParams.set("redirect_uri", process.env.GOOGLE_REDIRECT_URI!);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "openid email profile");

    return redirect(url.toString());
  })

  // Step 2: รับ callback + ดึง token
  .get("/callback", async ({ query, set, session }) => {
    const { code } = query;

    if (!code) {
      set.status = 400;
      return { error: "Missing code" };
    }

    // 1) แลก token
    const tokenJson = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
        code
      })
    }).then((r) => r.json());

    if (!tokenJson.access_token) {
      set.status = 400;
      return { error: "Cannot get access token" };
    }

    // 2) ดึงข้อมูล user จาก Google
    const googleUser = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenJson.access_token}` }
      }
    ).then((r) => r.json());

    // 3) เช็ค user ใน DB
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email }
    });

    // 4) ถ้าไม่มีให้สร้าง
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name,
          avatar: googleUser.picture
        }
      });
    }

    // 5) เก็บ user id ลง cookie session
    session.login(user.id);

    return `
      <script>
        window.location.href = "/"; // redirect ไปหน้า dashboard/frontend
      </script>
    `;
  })

  // ใช้สำหรับ logout
  .get("/logout", ({ session }) => {
    session.logout();
    return { message: "logged out" };
  });
