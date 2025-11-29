import Redis from 'ioredis'
import { logger } from "../utils/logger";

export const client = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
//   password: process.env.REDIS_PASSWORD || undefined
})

// เช็ค connection
client.on('connect', () => {
  logger.info('✅ Redis connected')
})

client.on('ready', () => {
  logger.info('🔹 Redis ready to use')
})

client.on('error', (error) => {
  logger.error({ err: error.message }, '❌ Redis error')
  process.exit(1)
})

client.on('close', () => {
  logger.warn('⚠️ Redis connection closed')
})

client.on('reconnecting', () => {
  logger.error('⏳ Redis reconnecting...')
})
