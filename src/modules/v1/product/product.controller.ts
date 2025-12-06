import { Elysia, t } from "elysia";
import { ProductService } from "./product.service";
import {
  ProductPlainInputCreate,
  ProductPlainInputUpdate,
} from "../../../generated/prismabox/Product";
import { logger } from "../../../utils/logger";

export class ProductController {
  private productService = new ProductService();

  // GET /api/v1/products
  getProducts = async () => {
    try {
      const products = await this.productService.getAll();
      return {
        status: "success",
        data: products,
      };
    } catch (error: any) {
      logger.error(error);
      return {
        status: "error",
        message: `${error.message}`,
      };
    }
  };

  // GET /api/v1/products/:id
  getProductById = async ({
    params,
    set,
  }: {
    params: { id: string };
    set: any;
  }) => {
    try {
      const id = Number(params.id);
      const product = await this.productService.getById(id);

      if (!product) {
        set.status = 404;
        return { status: "error", message: "Product not found" };
      }

      return {
        status: "success",
        data: product,
      };
    } catch (error: any) {
      logger.error(error);
      return {
        status: "error",
        message: `${error.message}`,
      };
    }
  };

  // POST /api/v1/products
  createProduct = async ({
    body,
  }: {
    body: typeof ProductPlainInputCreate.static;
  }) => {
    try {
      const newProduct = await this.productService.create(body);
      return {
        status: "success",
        data: newProduct,
      };
    } catch (error: any) {
      logger.error(error);
      return {
        status: "error",
        message: `${error.message}`,
      };
    }
  };

  // PATCH /api/v1/products/:id
  updateProduct = async ({
    params,
    body,
  }: {
    params: { id: string };
    body: typeof ProductPlainInputUpdate.static;
  }) => {
    try {
      const id = Number(params.id);
      const updatedProduct = await this.productService.update(id, body);
      return {
        status: "success",
        data: updatedProduct,
      };
    } catch (error: any) {
      logger.error(error);
      return {
        status: "error",
        message: `${error.message}`,
      };
    }
  };

  // DELETE /api/v1/products/:id
  deleteProduct = async ({ params }: { params: { id: string } }) => {
    try {
      const id = Number(params.id);
      await this.productService.delete(id);
      return {
        status: "success",
        message: "Product deleted successfully",
      };
    } catch (error: any) {
      logger.error(error);
      return {
        status: "error",
        message: `${error.message}`,
      };
    }
  };
}
