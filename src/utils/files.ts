import { minioClient } from "../config/minio";
import { v4 as uuidv4 } from 'uuid';
import { logger } from "./logger";
import { prisma } from "../config/prisma";
import sharp from "sharp";
const bucketName = process.env.MINIO_BUCKET_NAME || 'default-bucket'

export const uploadFile = async (file: File, folder: string = 'products'): Promise<string> => {
    try {
        // const bucketExists = await minioClient.bucketExists(bucketName);
        // if (!bucketExists) {
        //     await minioClient.makeBucket(bucketName, 'us-east-1');
        // }

        // const extension = file.name.split('.').pop();
        // const fileName = `${folder}/${uuidv4()}.${extension}`;
        // const arrayBuffer = await file.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);

        // await minioClient.putObject(bucketName, fileName, buffer, buffer.length, {
        //     'Content-Type': file.type
        // });
        // return fileName;
        const bucketExists = await minioClient.bucketExists(bucketName);
        if (!bucketExists) {
            await minioClient.makeBucket(bucketName, 'us-east-1');
        }

        let extension = file.name.split('.').pop()?.toLowerCase();
        let fileName = `${folder}/${uuidv4()}.${extension}`;

        const arrayBuffer = await file.arrayBuffer();
        let buffer: Buffer = Buffer.from(arrayBuffer);
        const fileType = file.type;

        if (['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(fileType)) {
            let imageChain = sharp(buffer).rotate();

            const metadata = await imageChain.metadata();
            const width = Math.floor(metadata.width || 1000);
            const height = Math.floor(metadata.height || 1000);

            const watermarkText = `www.phraeteak.com`;
            const svgWatermark = `
                <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="watermark-pattern" width="300" height="300" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                            <text 
                                x="50%" 
                                y="50%" 
                                text-anchor="middle" 
                                fill="rgba(255, 255, 255, 0.3)" 
                                font-size="24" 
                                font-weight="bold" 
                                font-family="Arial, sans-serif"
                                style="text-shadow: 1px 1px 2px black;" 
                            >
                                ${watermarkText}
                            </text>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#watermark-pattern)" />
                </svg>
            `;

            imageChain = imageChain.composite([{
                input: Buffer.from(svgWatermark),
                blend: 'over',
                top: 0,
                left: 0
            }]);

            // เช็คประเภทไฟล์และตั้งค่า Quality 
            if (fileType === 'image/jpeg' || fileType === 'image/jpg') {
                // JPEG: quality 100 คือชัดสุด (แต่ไฟล์จะใหญ่ขึ้นหน่อย)
                imageChain = imageChain.jpeg({ quality: 100, mozjpeg: true });
            } else if (fileType === 'image/png') {
                // PNG: เป็น Lossless อยู่แล้ว แต่ compressionLevel ต่ำๆ จะเซฟไวแต่ไฟล์ใหญ่
                imageChain = imageChain.png({ quality: 100 });
            } else if (fileType === 'image/webp') {
                // WebP: quality 100 คือ lossless หรือใกล้เคียงมาก
                imageChain = imageChain.webp({ quality: 100 });
            }

            buffer = await imageChain.toBuffer();
        }

        await minioClient.putObject(bucketName, fileName, buffer, buffer.length, {
            'Content-Type': fileType
        });

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