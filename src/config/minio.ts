import * as Minio from 'minio'
import { logger } from "../utils/logger";

export const minioClient = new Minio.Client({
    endPoint: (process.env.MINIO_ENDPOINT || 'localhost').replace(/^https?:\/\//, ''),
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY || '',
    secretKey: process.env.MINIO_SECRET_KEY || ''
})

export const bucketName = process.env.MINIO_BUCKET_NAME || 'default-bucket'

// เช็ค connection
// Minio client doesn't have an explicit 'connect' event like Redis,
// but we can try to list buckets to verify connectivity.
minioClient.listBuckets()
    .then(() => {
        logger.info('✅ Minio connected')
    })
    .catch((err) => {
        logger.error({ err: err.message }, '❌ Minio connection error')
    })
