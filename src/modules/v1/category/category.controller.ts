import { CategoryService } from "./category.service";
import { apiResponse } from "../../../utils/response";
import { logger } from "../../../utils/logger";
import { Context } from "elysia";
export class CategoryController {
    private categoryService = new CategoryService();

    getCategories = async ({ set }: Context) => {
        try {
            const categories = await this.categoryService.getAll();
            return apiResponse.success(set, categories);
        } catch (error: any) {
            logger.error(error);
            return apiResponse.internalServerError(set, error.message);
        }
    };
    createCategory = async ({ body, set }: { body: any; set: Context["set"]; }) => {
        try {
            const category = await this.categoryService.createCategory(body);
            return apiResponse.success(set, category);
        } catch (error: any) {
            logger.error(error);
            return apiResponse.internalServerError(set, error.message);
        }
    };
    updateStatusCategory = async ({ body, set }: { body: any; set: Context["set"]; }) => {
        try {
            const category = await this.categoryService.findById(parseInt(body.id));
            if (!category) {
                return apiResponse.notFound(set, "Category not found");
            }
            await this.categoryService.updateStatusCategory(body);
            return apiResponse.success(set, `เปลี่ยนแปลงสถานะสำเร็จ`);
        } catch (error: any) {
            logger.error(error);
            return apiResponse.internalServerError(set, error.message);
        }
    };
    deleteCategory = async ({ params, set }: { params: { id: string }; set: Context["set"]; }) => {
        try {
            const category = await this.categoryService.findById(parseInt(params.id));
            if (!category) {
                return apiResponse.notFound(set, "Category not found");
            }
            await this.categoryService.deleteCategory(parseInt(params.id));
            return apiResponse.success(set, `ลบหมวดหมู่ *${category.name}* สำเร็จแล้ว!`);
        } catch (error: any) {
            logger.error(error);
            return apiResponse.internalServerError(set, error.message);
        }
    };
}