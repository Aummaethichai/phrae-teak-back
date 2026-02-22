import { Elysia, t } from "elysia";
import { ProductController } from "./product.controller";
import { isAuthenticated, isAdmin } from "../../../middlewares/auth.middleware";
import { apiResponse } from "../../../utils/response";
import {
  ProductPlainInputCreate,
  ProductPlainInputUpdate,
} from "../../../generated/prismabox/Product";
import { CreateProductDTO } from "./product.schema";

const productController = new ProductController();

export const productRoutes = new Elysia({ prefix: "/products" })
  // no middleware
  .get("/", productController.getProducts)
  .get("/:id", productController.getProductById, {
    params: t.Object({ id: t.String() }),
  })

  // Protected Routes (ต้อง Login ก่อน)
  .use(isAuthenticated)
  // create products
  .post("/", productController.createProduct, {
    body: CreateProductDTO,
  })
  .patch("/:id", productController.updateProduct, {
    params: t.Object({ id: t.String() }),
    body: ProductPlainInputUpdate,
  })
  .delete("/:id", productController.deleteProduct, {
    params: t.Object({ id: t.String() }),
  })
  .use(isAdmin)
  .post("/admin", productController.createProductAdmin, {
    body: t.Object({
      name: t.String(),
      // name: t.String({ minLength: 1, error: 'Name cannot be empty' }),
      description: t.Optional(t.String()),
      price: t.Numeric(),
      stock: t.Numeric(),
      categoryId: t.Union([t.Numeric(), t.Array(t.Numeric())]),
      isPreorder: t.Optional(t.Boolean()),
      leadTime: t.Optional(t.Numeric()),
      images: t.Files()
    })
  })
  .get('/admin', productController.getProductsAdmin, {
    query: t.Object({
      page: t.Optional(t.String()),
      limit: t.Optional(t.String()),
    })
  })
  .get('/admin/:id', productController.getProductAdminById, {
    params: t.Object({ id: t.String() }),
  })
