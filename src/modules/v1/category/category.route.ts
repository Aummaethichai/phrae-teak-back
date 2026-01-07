import Elysia, { t } from "elysia";
import { isAdmin, isAuthenticated } from "../../../middlewares/auth.middleware";
import { CategoryController } from "./category.controller";

const categoryController = new CategoryController();

export const categoryRoute = new Elysia({ prefix: "/category" })
    .use(isAuthenticated)
    .use(isAdmin)
    .get('/', categoryController.getCategories)
    .post('/', categoryController.createCategory, {
        body: t.Object({
            name: t.String(),
            slug: t.String(),
            // isActive: t.Boolean(),
        }),
    })
    .put('/status', categoryController.updateStatusCategory, {
        body: t.Object({
            id: t.Numeric(),
            isActive: t.Boolean(),
        },),
    })
    .delete('/:id', categoryController.deleteCategory, {
        params: t.Object({
            id: t.String(),
        }),
    })