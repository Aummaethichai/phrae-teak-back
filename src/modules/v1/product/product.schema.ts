import { t } from "elysia";
import { ProductPlainInputCreate } from "../../../generated/prismabox/Product";

// Define DTO with categoryId
export const CreateProductDTO = t.Composite([
  ProductPlainInputCreate,
  t.Object({
    categoryId: t.Numeric()
  })
]);
