// src/modules/v1/test/test.schema.ts
import { t, Static } from 'elysia';
// ส่วนนี้จะเป็นการ validate request
// กำหนด Schema สำหรับ body ของ request สร้างข้อมูล test
export const createTestSchema = {
  body: t.Object({
    name: t.String({ minLength: 3, error: 'Name must be at least 3 characters long' }),
    value: t.Numeric({ error: 'Value must be a number' })
  })
};
export type CreateTestDto = Static<typeof createTestSchema.body>;

export const updateTestSchema = {
  params: t.Object({
    id: t.Numeric({ error: 'ID must be a number' })
  }),
  body: t.Object({
    name: t.Optional(t.String({ minLength: 3, error: 'Name must be at least 3 characters long' })),
    value: t.Optional(t.Numeric({ error: 'Value must be a number' }))
  })
};
export type UpdateTestDto = Static<typeof updateTestSchema.body>;
export type UpdateTestParamsDto = Static<typeof updateTestSchema.params>;
