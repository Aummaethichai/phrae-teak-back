import { Elysia } from 'elysia';
import testModule from './test';
import authModule from './auth';
import { productRoutes } from './product/product.route';
import { userRoutes } from "./user/user.route";
import { fileRoutes } from './file/file.route';
import { categoryRoute } from './category/category.route';

const v1Routes = new Elysia({ prefix: '/api/v1' })
  .use(testModule)
  .use(authModule)
  .use(productRoutes)
  .use(userRoutes)
  .use(fileRoutes)
  .use(categoryRoute)

export default v1Routes;
