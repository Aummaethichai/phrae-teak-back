import { prisma } from "../../../config/prisma";

export class CategoryService {
  async getAll(role: string) {
    const whereCondition = role === "admin" ? {} : { isActive: true };
    return await prisma.category.findMany({
      orderBy: {
        sortOrder: "asc",
      },
      where: whereCondition,
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: role === "admin",
      },
    });
  }

  async findById(id: number) {
    return await prisma.category.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
      },
    });
  }

  async createCategory(data: {
    name: string;
    slug: string;
    isActive?: boolean;
  }) {
    const lastCategory = await prisma.category.findFirst({
      orderBy: { sortOrder: "desc" },
    });
    const newSortOrder = lastCategory ? lastCategory.sortOrder + 1 : 1;
    return await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        isActive: data.isActive || false,
        sortOrder: newSortOrder,
      },
    });
  }

  async updateStatusCategory(data: { id: number; isActive: boolean }) {
    return await prisma.category.update({
      where: {
        id: data.id,
      },
      data: {
        isActive: data.isActive,
      },
    });
  }

  async deleteCategory(id: number) {
    return await prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
  async updateCategory(data: {
    id: number;
    name: string;
    slug: string;
    isActive?: boolean;
  }) {
    const oldData = await prisma.category.findUnique({
      where: { id: data.id },
    });

    if (!oldData) throw new Error("Not Found");

    const dataToUpdate: Record<string, any> = {};

    for (const key in data) {
      const typedKey = key as keyof typeof data;
      if (
        data[typedKey] !== undefined &&
        data[typedKey] !== oldData[typedKey]
      ) {
        dataToUpdate[typedKey] = data[typedKey];
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return "Nothing changed!";
    }
    const updated = await prisma.category.update({
      where: { id: data.id },
      data: dataToUpdate,
    });
    return updated;
  }

  async reorderCategory(body: { items: { id: number; sortOrder: number }[] }) {
    const { items } = body;
    await prisma.$transaction(
      items.map((item) =>
        prisma.category.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );
    return true;
  }
}
