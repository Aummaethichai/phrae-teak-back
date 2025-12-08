import { Elysia } from 'elysia'
import { googleAuth } from './google'
import { sessionPlugin } from './session'
import { authLocalRoutes } from './auth.route';

export const authRoutes = new Elysia({ prefix: '/auth' })
    .use(sessionPlugin)
    .use(googleAuth)
    .use(authLocalRoutes)


export default authRoutes;