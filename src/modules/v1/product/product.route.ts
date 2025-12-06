import { Elysia, t } from "elysia";
import { ProductController } from "./product.controller";
import { isAuthenticated } from "../../../middlewares/auth.middleware";
import {
  ProductPlainInputCreate,
  ProductPlainInputUpdate,
} from "../../../generated/prismabox/Product";
const productController = new ProductController();

export const productRoutes = new Elysia({ prefix: "/products" })
  // Public Routes (ใครก็ดูได้)
  .get("/", productController.getProducts)
  .get("/:id", productController.getProductById, {
    // params: t.Object({ id: t.Numeric() }),
  })

  // Protected Routes (ต้อง Login ก่อน)
  .use(isAuthenticated)
  .post("/", productController.createProduct, {
    body: ProductPlainInputCreate, // Validate Body ด้วย Schema จาก Prismabox
  })
  .patch("/:id", productController.updateProduct, {
    // params: t.Object({ id: t.Numeric() }),
    body: ProductPlainInputUpdate,
  })
  .delete("/:id", productController.deleteProduct, {
    // params: t.Object({ id: t.Numeric() }),
  });
