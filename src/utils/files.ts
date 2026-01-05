import { minioClient } from "../config/minio";
import { v4 as uuidv4 } from 'uuid';
import { logger } from "./logger";
import { prisma } from "../config/prisma";

const bucketName = process.env.MINIO_BUCKET_NAME || 'default-bucket'

export const uploadFile = async (file: File, folder: string = 'products'): Promise<string> => {
    try {
        const bucketExists = await minioClient.bucketExists(bucketName);
        if (!bucketExists) {
            await minioClient.makeBucket(bucketName, 'us-east-1');
        }

        const extension = file.name.split('.').pop();
        const fileName = `${folder}/${uuidv4()}.${extension}`;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await minioClient.putObject(bucketName, fileName, buffer, buffer.length, {
            'Content-Type': file.type
        });

        // Construct full URL or just return path?
        // Usually returning the path is better if you serve it via a proxy or pre-signed URL.
        // But for now, returning the path inside the bucket.
        // If we want a full URL we'd need to know the public endpoint.
        // Let's return the path for now as per schema "path In MinIO"
        return fileName;
    } catch (error) {
        logger.error({ err: error }, '❌ Upload file error');
        throw error;
    }
}

export const openFile = async (product_image_id: string): Promise<File> => {
    try {
        const productImage = await prisma.productImage.findUnique({ where: { id: parseInt(product_image_id) } });
        const path = productImage?.url || '';
        const object = await minioClient.getObject(bucketName, path);
        const chunks: Buffer[] = [];
        for await (const chunk of object) {
            chunks.push(Buffer.from(chunk));
        }
        const buffer = Buffer.concat(chunks);
        return new File([buffer], path, { type: 'application/octet-stream' });
    } catch (error) {
        logger.error({ err: error }, '❌ Open file error');
        throw error;
    }
}