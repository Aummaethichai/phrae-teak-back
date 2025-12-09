import { Context, Elysia, t } from "elysia";
import { ProductService } from "./product.service";
import {
  ProductPlainInputCreate,
  ProductPlainInputUpdate,
} from "../../../generated/prismabox/Product";
import { logger } from "../../../utils/logger";
import { apiResponse } from "../../../utils/response";

export class ProductController {
  private productService = new ProductService();

  // GET /api/v1/products
  getProducts = async ({ set }: Context) => {
    try {
      const products = await this.productService.getAll();
      return apiResponse.success(set, products)
    } catch (error: any) {
      logger.error(error.message);
      return apiResponse.internalServerError(set, error.message);
    }
  };

  // GET /api/v1/products/:id
  getProductById = async ({
    params,
    set,
  }: {
    params: { id: string };
    set: Context['set'];
  }) => {
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
  createProduct = async ({
    body,
    set
  }: {
    body: typeof ProductPlainInputCreate.static;
    set: Context['set'];
  }) => {
    try {
      const newProduct = await this.productService.create(body);
      return apiResponse.created(set, newProduct);
    } catch (error: any) {
      logger.error(error);
      return apiResponse.internalServerError(set, error.message); 
    }
  };

  // PATCH /api/v1/products/:id
  updateProduct = async ({
    params,
    body,
    set
  }: {
    params: { id: string };
    body: typeof ProductPlainInputUpdate.static;
    set: Context['set'];
  }) => {
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
  deleteProduct = async ({ params, set }: { params: { id: string }; set: Context['set'] }) => {
    try {
      const id = Number(params.id);
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
