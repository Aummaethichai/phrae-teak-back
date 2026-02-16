import { prisma } from "../../../config/prisma";
import {
  ProductPlain,
  ProductPlainInputCreate,
  ProductPlainInputUpdate,
} from "../../../generated/prismabox/Product";
import { ProductImageRelationsInputCreate } from "../../../generated/prismabox/ProductImage";
import { uploadFile } from "../../../utils/files";
import { CreateProductDTO } from "./product.schema";

export class ProductService {
  // ดึงสินค้าทั้งหมด
  async getAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          stock: true,
          isPreorder: true,
          leadTime: true,
          isActive: true,
          // createdAt:false,
          // updatedAt:false,
          images: {
            orderBy: { sortOrder: "asc" },
            select: {
              id: true,
              productId: true,
              url: true,
              sortOrder: true,
              isMain: true,
              // createdAt:false,
            },
          },
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
        where: {
          isActive: true,
        },
      }),
      prisma.product.count({
        where: {
          isActive: true,
        },
      }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAllAdmin(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          stock: true,
          isPreorder: true,
          leadTime: true,
          isActive: true,
          // createdAt:false,
          // updatedAt:false,
          images: {
            orderBy: { sortOrder: "asc" },
            select: {
              id: true,
              productId: true,
              url: true,
              sortOrder: true,
              isMain: true,
              // createdAt:false,
            },
          },
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      }),
      prisma.product.count(),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ดึงสินค้าตาม ID
  async getById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
        },
        categories: true,
      },
    });
  }

  // สร้างสินค้าใหม่
  async create(data: typeof CreateProductDTO.static) {
    return await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description ?? null,
        stock: data.stock ?? 0,
        categories: {
          create: {
            categoryId: data.categoryId,
          },
        },
      },
    });
  }

  // อัพเดทสินค้า
  async update(id: number, data: typeof ProductPlainInputUpdate.static) {
    return await prisma.product.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  // ลบสินค้า
  async delete(id: number) {
    return await prisma.product.delete({
      where: { id },
    });
  }

  async createProductWithImages(
    data: {
      name: string;
      description?: string | null;
      price: number;
      stock?: number;
      categoryId: [];
      isPreorder?: boolean;
      leadTime?: number;
    },
    files: File[],
  ) {
    const uploadedImages = [];
    if (files && Array.isArray(files)) {
      for (const [index, file] of files.entries()) {
        const path = await uploadFile(file);
        uploadedImages.push({
          url: path,
          sortOrder: index,
          isMain: index === 0,
        });
      }
    } else if (files) {
      // Single file case
      const path = await uploadFile(files as unknown as File);
      uploadedImages.push({
        url: path,
        sortOrder: 0,
        isMain: true,
      });
    }

    // if (!data.categoryId.length && Array.isArray(data.categoryId)) {
    //   throw new Error("Category is required");
    // }
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock ?? 0,
        categories: {
          create: data.categoryId.map((item: any, index: number) => {
            const catId = typeof item === "object" ? item.id : item;
            return {
              category: {
                connect: {
                  id: Number(catId),
                },
              },
              sortOrder: index,
            };
          }),
        },
        isPreorder: data.isPreorder ?? false,
        leadTime: data.leadTime,
        images: {
          create: uploadedImages,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        isPreorder: true,
        leadTime: true,
        isActive: true,
        categories: {
          select: {
            id: true,
            categoryId: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            sortOrder: true,
            isMain: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });
  }
}
