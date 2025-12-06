import { Elysia } from 'elysia'
import { googleAuth } from './google'
import { sessionPlugin } from './session'

export const authRoutes = new Elysia({ prefix: '/auth' })
    .use(sessionPlugin)
    .use(googleAuth)


export default authRoutes;