import { Elysia, t } from "elysia";
import { ProductController } from "./product.controller";
import { isAuthenticated } from "../../../middlewares/auth.middleware";
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
  .post("/admin", productController.createProductAdmin, {
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
      price: t.Numeric(),
      stock: t.Numeric(),
      categoryId: t.Numeric(),
      isPreorder: t.Optional(t.Boolean()),
      leadTime: t.Optional(t.Numeric()),
      images: t.Files()
    })
  });
