import { Elysia } from "elysia";

export const sessionPlugin = new Elysia({
  name: "session",
})
  .derive(({ cookie: { session } }) => {
    const userId = session?.value ?? null;

    return {
      session: {
        userId,
        login: (id: number) => {
          session.set({
            value: id.toString(),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 7 วัน
          });
        },
        logout: () => {
          session.remove();
        }
      }
    };
  });
