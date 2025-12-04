// modules/v1/test/test.controller.ts
import type { Context } from 'elysia';
import { TestService } from './test.service';
import type { CreateTestDto, UpdateTestDto, UpdateTestParamsDto } from './test.schema';

export class TestController {
  // สร้าง instance ของ TestService
  private testService = new TestService();

  // Method สำหรับจัดการ GET request
  public getTestData = () => {
    const data = this.testService.getHelloMessage();
    return {
      status: 'success',
      message: data,
    };
  };

  // Method สำหรับจัดการ POST request
  // การใช้ Context ของ Elysia เป็นอีกวิธีที่ทำให้ Signature ของ handler เป็นมาตรฐาน
  // โดยเรายังคงได้รับประโยชน์จาก Type Safety ของ CreateTestDto เหมือนเดิม
  // TypeScript จะรู้ว่า body ที่อยู่ใน Context นี้มี Type เป็น CreateTestDto
  public createTestData = ({ body }: Context<{ body: CreateTestDto }>) => {
    // ในสถานการณ์จริง ส่วนนี้จะเรียก service เพื่อบันทึกข้อมูลลง database
    // const newItem = this.testService.create(body);
    console.log('Received data:', body);

    return {
      status: 'success',
      message: `Created item with name: ${body.name} and value: ${body.value}`
    };
  }

  // Method สำหรับจัดการ PUT/PATCH request
  public updateTestData = ({ params, body }: Context<{ params: UpdateTestParamsDto, body: UpdateTestDto }>) => {
    // TypeScript รู้ว่า params.id เป็น number
    // และรู้ว่า body.name หรือ body.value อาจจะไม่มีค่าก็ได้ (เป็น optional)
    console.log(`Updating item with ID: ${params.id}`);

    // ในสถานการณ์จริง เราจะเรียก service เพื่ออัปเดตข้อมูล
    // const updatedItem = this.testService.update(params.id, body);

    // เราสามารถตรวจสอบได้ว่า field ไหนถูกส่งมาบ้าง
    if (body.name) console.log(`New name: ${body.name}`);
    if (body.value) console.log(`New value: ${body.value}`);

    return {
      status: 'success',
      message: `Updated item with ID: ${params.id}`
    };
  }
}
