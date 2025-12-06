import { prisma } from "../../../config/prisma";
import { ProductPlain, ProductPlainInputCreate, ProductPlainInputUpdate } from "../../../generated/prismabox/Product";

export class ProductService {
  // ดึงสินค้าทั้งหมด
  async getAll() {
    return await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  // ดึงสินค้าตาม ID
  async getById(id: number) {
    return await prisma.product.findUnique({
      where: { id }
    });
  }

  // สร้างสินค้าใหม่
  async create(data: typeof ProductPlainInputCreate.static) {
    return await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description ?? null,
        imageUrl: data.imageUrl ?? null,
        stock: data.stock ?? 0,
      }
    }),{
        body: ProductPlainInputCreate,
        response: ProductPlain
    };
  }

  // อัพเดทสินค้า
  async update(id: number, data: typeof ProductPlainInputUpdate.static) {
    return await prisma.product.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
  }

  // ลบสินค้า
  async delete(id: number) {
    return await prisma.product.delete({
      where: { id }
    });
  }
}