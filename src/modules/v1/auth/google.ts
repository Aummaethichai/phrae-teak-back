import { Elysia, redirect } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { v4 as uuidv4 } from "uuid";
import {
  UserInputCreate,
  UserPlain,
  UserPlainInputCreate,
} from "../../../generated/prismabox/User";
import { prisma } from "../../../config/prisma";
import {
  createSession,
  deleteSession,
  ElysiaCookie,
} from "./session.service";
import { apiResponse } from "../../../utils/response";

interface userGoogle {
  id: number;
  email: string;
  name: string;
  // password: string;
  // googleId: string;
  role: string;
  profileImage : string;
}
export const googleAuth = new Elysia({ prefix: "/google" })
  .use(cookie())
  // Step 1: Redirect ไป Google
  .get("/login", ({ redirect }) => {
    const url = new URL(`${process.env.auth_uri}`);

    url.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
    url.searchParams.set("redirect_uri", process.env.GOOGLE_REDIRECT_URI!);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "openid email profile");

    return redirect(url.toString());
  })

  // Step 2: รับ callback + ดึง token
  .get("/callback", async ({ query, cookie, set }) => {
    const { code } = query;

    if (!code) {
      throw apiResponse.badRequest(set, "Missing code.");
    }

    const tokenJson = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
        code,
      }),
    }).then((r) => r.json());

    if (!tokenJson.access_token) {
      throw apiResponse.badRequest(set, "Failed to retrieve access token from Google.");
    }

    // 2) ดึงข้อมูล user จาก Google
    const googleUser = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenJson.access_token}` },
      }
    ).then((r) => r.json());

    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });
    
    if (!user) {
       return redirect(`${process.env.FRONTEND_URL}/register?email=${googleUser.email}&name=${googleUser.name}&googleId=${googleUser.id}&role=USER&profile_image=${googleUser.picture}`);
    }

    await createSession(
      {
        id: user.id,
        email: user.email,
        name: user.name || "",
        // password: user.password || "",
        // googleId: user.googleId || "",
        role: user.role,
        profile_image: user.profileImage  || "",
      },
      cookie as unknown as ElysiaCookie
    );

    return redirect(`${process.env.FRONTEND_URL}`);
  })
