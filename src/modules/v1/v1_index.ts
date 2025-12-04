import { Elysia } from 'elysia';
import testModule from './test';

const v1Routes = new Elysia({ prefix: '/api/v1' })
  .use(testModule);

export default v1Routes;
