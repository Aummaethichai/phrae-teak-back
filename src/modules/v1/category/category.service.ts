import { prisma } from "../../../config/prisma";

export class CategoryService {

    async getAll(role: string) {
        const whereCondition = role === 'admin' ? {} : { isActive: true };
        return await prisma.category.findMany({
            orderBy: {
                id: 'asc'
            },
            where: whereCondition,
            select: {
                id: true,
                name: true,
                slug: true,
                isActive: true,
            }
        });
    }

    async findById(id: number) {
        return await prisma.category.findUnique({
            where: {
                id: id
            },
            select: {
                name: true,
            }
        })
    }

    async createCategory(data: {
        name: string;
        slug: string;
        isActive?: boolean;
    }) {
        return await prisma.category.create({
            data: {
                name: data.name,
                slug: data.slug,
                isActive: data.isActive || false,
            }
        })
    }

    async updateStatusCategory(data: {
        id: number;
        isActive: boolean;
    }) {
        return await prisma.category.update({
            where: {
                id: data.id
            },
            data: {
                isActive: data.isActive
            }
        })
    }

    async deleteCategory(
        id: number) {
        return await prisma.category.delete({
            where: {
                id: id
            }
        })
    }
}