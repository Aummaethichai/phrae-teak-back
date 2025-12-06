import { Elysia } from 'elysia';
import testModule from './test';
import authModule from './auth';
import productModule from './product';

const v1Routes = new Elysia({ prefix: '/api/v1' })
  .use(testModule)
  .use(authModule)
  .use(productModule);

export default v1Routes;
