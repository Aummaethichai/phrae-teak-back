import { Context, Elysia, t } from "elysia";
import { ProductService } from "./product.service";
import {
  ProductPlainInputCreate,
  ProductPlainInputUpdate,
} from "../../../generated/prismabox/Product";
import { logger } from "../../../utils/logger";
import { apiResponse } from "../../../utils/response";

type AuthUser = { user: { id: string; role: 'ADMIN' | 'USER' } };

type baseProductContext = {
  params: { id: string };
  set: Context["set"];
};
type createProductContext = {
  body: typeof ProductPlainInputCreate.static;
  set: Context["set"];
};

type updateProductContext = {
  params: { id: string };
  body: typeof ProductPlainInputUpdate.static;
  set: Context["set"];
};
export class ProductController {
  private productService = new ProductService();

  // GET /api/v1/products
  getProducts = async ({ set }: Context) => {
    try {
      const products = await this.productService.getAll();
      return apiResponse.success(set, products);
    } catch (error: any) {
      logger.error(error.message);
      return apiResponse.internalServerError(set, error.message);
    }
  };

  // GET /api/v1/products/:id
  getProductById = async ({ params, set }: baseProductContext) => {
    try {
      const id = Number(params.id);
      const product = await this.productService.getById(id);

      if (!product) {
        return apiResponse.badRequest(set, "Product not found");
      }

      return apiResponse.success(set, product);
    } catch (error: any) {
      logger.error(error.message);
      return apiResponse.internalServerError(set, error.message);
    }
  };

  // POST /api/v1/products
  createProduct = async ({ body, set }: createProductContext) => {
    try {
      await this.productService.create(body);
      return apiResponse.created(set, "Product created successfully");
    } catch (error: any) {
      logger.error(error);
      return apiResponse.internalServerError(set, error.message);
    }
  };

  // PATCH /api/v1/products/:id
  updateProduct = async ({ params, body, set }: updateProductContext & AuthUser) => {
    try {
      const id = Number(params.id);
      const updatedProduct = await this.productService.update(id, body);
      return apiResponse.success(set, updatedProduct);
    } catch (error: any) {
      logger.error(error);
      return apiResponse.internalServerError(set, error.message);
    }
  };

  // DELETE /api/v1/products/:id
  deleteProduct = async ({ params, set, user }: baseProductContext & AuthUser) => {
    try {
      console.log(user);
      
      const id = Number(params.id);
      const check_product = await this.productService.getById(id);

      if (!check_product) {
        return apiResponse.badRequest(set, "Product not found");
      }

      await this.productService.delete(id);
      return {
        status: "success",
        message: "Product deleted successfully",
      };
    } catch (error: any) {
      logger.error(error);
      return apiResponse.internalServerError(set, error.message);
    }
  };
}
