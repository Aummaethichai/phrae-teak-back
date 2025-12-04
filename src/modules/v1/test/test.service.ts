// modules/v1/test/test.service.ts
export class TestService {
  public getHelloMessage(): string {
    // ในอนาคต ส่วนนี้สามารถเชื่อมต่อฐานข้อมูล, เรียก API ภายนอก, หรือคำนวณค่าต่างๆ ได้
    return 'Hello from Test Module!';
  }
}
