import { Context, Elysia, t } from "elysia";
import { ProductService } from "./product.service";
import {
  ProductPlainInputCreate,
  ProductPlainInputUpdate,
} from "../../../generated/prismabox/Product";
import { logger } from "../../../utils/logger";
import { apiResponse } from "../../../utils/response";

import { CreateProductDTO } from "./product.schema";

type AuthUser = { user: { id: string; role: "ADMIN" | "USER" } };

type baseProductContext = {
  params: { id: string };
  set: Context["set"];
};
type createProductContext = {
  body: typeof CreateProductDTO.static;
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
  getProducts = async ({ query, set, headers }: Context) => {
    try {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const { data: products, meta } = await this.productService.getAll(
        page,
        limit,
      );
      const protocol = process.env.APP_ENV === "development" ? "http" : "https";
      const hostName = headers["host"];

      const responseData = products.map((product) => {
        return {
          ...product,
          images: product.images.map((image) => {
            return {
              ...image,
              url: `${protocol}://${hostName}/api/v1/files/${image.id}`,
            };
          }),
        };
      });

      return apiResponse.success(set, {
        products: responseData,
        _metadata: meta,
      });
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
  updateProduct = async ({
    params,
    body,
    set,
  }: updateProductContext & AuthUser) => {
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
  deleteProduct = async ({
    params,
    set,
    user,
  }: baseProductContext & AuthUser) => {
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

  // POST /api/v1/products/admin
  createProductAdmin = async ({
    body,
    set,
    headers,
  }: {
    body: any;
    set: Context["set"];
    headers: Context["headers"];
  }) => {
    try {
      const { images, ...data } = body;
      if (!data.name.length) {
        return apiResponse.badRequest(set, "Name is required");
      }
      const categoryIds = Array.isArray(body.categoryId)
        ? body.categoryId
        : [body.categoryId];

      const product = await this.productService.createProductWithImages(
        {
          name: data.name,
          description: data.description,
          price: Number(data.price),
          stock: Number(data.stock),
          categoryId: categoryIds.map((id: number) => ({ id })),
          isPreorder: Boolean(data.isPreorder),
          leadTime: data.leadTime ? Number(data.leadTime) : undefined,
        },
        images,
      );

      const protocol = process.env.APP_ENV === "development" ? "http" : "https";
      const hostName = headers["host"];

      const response = {
        ...product,
        images: product.images.map((image) => {
          return {
            ...image,
            url: `${protocol}://${hostName}/api/v1/files/${image.id}`,
          };
        }),
      };

      return apiResponse.created(set, response);
    } catch (error: any) {
      logger.error(error);
      return apiResponse.internalServerError(set, error.message);
    }
  };

  getProductsAdmin = async ({ query, set, headers }: Context) => {
    try {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;

      const { data: products, meta } = await this.productService.getAllAdmin(
        page,
        limit,
      );
      const protocol = process.env.APP_ENV === "development" ? "http" : "https";
      const hostName = headers["host"];

      const responseData = products.map((product) => {
        return {
          ...product,
          images: product.images.map((image) => {
            return {
              ...image,
              url: `${protocol}://${hostName}/api/v1/files/${image.id}`,
            };
          }),
        };
      });

      return apiResponse.success(set, {
        products: responseData,
        _metadata: meta,
      });
    } catch (error: any) {
      logger.error(error.message);
      return apiResponse.internalServerError(set, error.message);
    }
  };

  getProductAdminById = async ({ params, set, headers }: baseProductContext) => {
    try {
      const id = Number(params.id);
      const { data: product } = await this.productService.getProductAdminById(id);

      if (!product) {
        return apiResponse.badRequest(set, "Product not found");
      }

      const protocol = process.env.APP_ENV === "development" ? "http" : "https";
      const hostName = headers["host"];

      const responseData = {
        ...product,
        images: product.images.map((image) => {
          return {
            ...image,
            url: `${protocol}://${hostName}/api/v1/files/${image.id}`,
          };
        }),
      };

      return apiResponse.success(set, responseData);
    } catch (error: any) {
      logger.error(error.message);
      return apiResponse.internalServerError(set, error.message);
    }
  };
}
