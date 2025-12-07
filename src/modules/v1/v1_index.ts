import { Elysia } from 'elysia';
import testModule from './test';
import authModule from './auth';
import productModule from './product';

const v1Routes = new Elysia({ prefix: '/api/v1' })
  // .onBeforeHandle(async ({ cookie: { session } }) => {
  //   if(!session){
  //     throw {
  //       status: 401,
  //       message: "Unauthorized: Not Found Session222"
  //     }
  //   }
  // })
  .use(testModule)
  .use(authModule)
  .use(productModule);

export default v1Routes;
