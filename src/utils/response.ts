import { Context } from "elysia";

interface ApiResponse<T = any> {
  status: "success" | "error";
  message?: string;
  data?: T;
  errors?: any;
}

export const apiResponse = {
  ok: <T>(set: Context["set"], data: T, message: string = "Success") => {
    set.status = 200;
    return { status_code: 200, status: "success", message, data };
  },

  created: <T>(
    set: Context["set"],
    data: T,
    message: string = "Created successfully"
  ) => {
    set.status = 201;
    return { status_code: 201, status: "success", message, data };
  },

  badRequest: (
    set: Context["set"],
    message: string = "Bad Request",
    errors?: any
  ) => {
    set.status = 400;
    return { status_code: 400, status: "error", message, errors };
  },

  unauthorized: (set: Context["set"], message: string = "Unauthorized") => {
    set.status = 401;
    return { status_code: 401, status: "error", message };
  },

  forbidden: (set: Context["set"], message: string = "Forbidden access") => {
    set.status = 403;
    return { status_code: 403, status: "error", message };
  },

  notFound: (set: Context["set"], message: string = "Resource not found") => {
    set.status = 404;
    return { status_code: 404, status: "error", message };
  },

  conflict: (set: Context["set"], message: string = "Data conflict") => {
    set.status = 409;
    return { status_code: 409, status: "error", message };
  },

  unprocessable: (
    set: Context["set"],
    message: string = "Validation failed",
    errors?: any
  ) => {
    set.status = 422;
    return { status_code: 422, status: "error", message, errors };
  },

  internalServerError: ( error: any) => {
    // แนะนำ: อย่าส่ง error.message ดิบๆ ไปหา User ถ้าเป็น Production (มันไม่ปลอดภัย)
    // แต่ระหว่าง Dev ส่งไปได้เพื่อให้รู้ว่าพังตรงไหน
    const response = {
      status_code: 500,
      status: "error",
      message: "Internal Server Error",
      //   debug: error.message // เปิดใช้เฉพาะตอน Dev
    };

    if (process.env.NODE_ENV !== "production") {
      (response as any).debug = error.message;
    }

    return response;
  },
};
