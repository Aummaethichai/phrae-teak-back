// modules/v1/test/test.route.ts
import { Elysia } from 'elysia';
import { TestController } from './test.controller';
import { createTestSchema } from './test.schema';

// สร้าง instance ของ Controller เพื่อนำไปใช้ใน route
const testController = new TestController();

// สร้าง Elysia instance สำหรับโมดูล test โดยเฉพาะ
// กำหนด prefix '/test' ทำให้ path ทั้งหมดในนี้จะขึ้นต้นด้วย /test
export const testRoutes = new Elysia({ prefix: '/test' })
  .get('/', testController.getTestData)
  .get('/test2', testController.getTestData) // GET /api/v1/test/test2
  .get('/test3', () => ({ message: "This is the third test route!" })) // GET /api/v1/test/test3
  .post('/', testController.createTestData, createTestSchema); // POST /api/v1/test
