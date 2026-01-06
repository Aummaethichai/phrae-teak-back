import { Context } from "elysia";
import { prisma } from "../../../config/prisma";
import { bucketName, minioClient } from "../../../config/minio";
import { logger } from "../../../utils/logger";
import path from "path";

type GetFileContext = {
    params: { id: string };
    set: Context["set"];
    headers: Record<string, string>;
};

async function streamToBuffer(stream: any): Promise<Buffer> {
    const chunks: any[] = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}

export class FileController {
    async getFile({ params: { id }, set, headers }: GetFileContext) {
        try {
            const productImage = await prisma.productImage.findUnique({
                where: { id: parseInt(id) },
            });

            if (!productImage) {
                set.status = 404;
                return "File not found";
            }

            const fileName = productImage.url;
            const fileExtension = path.extname(fileName).toLowerCase();

            if (fileExtension === ".pdf") {
                const stream = await minioClient.getObject(bucketName, fileName);
                set.headers['Content-Type'] = 'application/pdf';
                set.headers['Content-Disposition'] = `inline; filename="${id}.pdf"`;
                return stream;
            } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(fileExtension)) {
                const stream = await minioClient.getObject(bucketName, fileName);

                if (fileExtension === '.webp') set.headers['Content-Type'] = 'image/webp';
                if (fileExtension === '.png') set.headers['Content-Type'] = 'image/png';
                if (fileExtension === '.jpg' || fileExtension === '.jpeg') set.headers['Content-Type'] = 'image/jpeg';

                set.headers['Cache-Control'] = 'public, max-age=31536000'; // Cache ได้นานๆ เลยเพราะรูปไม่เปลี่ยน

                return stream;
            } else if (fileExtension === '.mp4') {
                const objectStat = await minioClient.statObject(bucketName, fileName);
                const fileSize = objectStat.size;
                const range = headers['range'];

                if (!range) {
                    set.headers['Content-Length'] = fileSize.toString();
                    set.headers['Content-Type'] = 'video/mp4';
                    return await minioClient.getObject(bucketName, fileName);
                }

                const parts = range.replace(/bytes=/, '').split('-');
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

                if (start >= fileSize || end >= fileSize) {
                    set.status = 416;
                    return 'Requested range not satisfiable';
                }

                const chunkSize = end - start + 1;
                set.status = 206;
                set.headers['Content-Range'] = `bytes ${start}-${end}/${fileSize}`;
                set.headers['Accept-Ranges'] = 'bytes';
                set.headers['Content-Length'] = chunkSize.toString();
                set.headers['Content-Type'] = 'video/mp4';

                return await minioClient.getPartialObject(bucketName, fileName, start, chunkSize);
            } else {
                set.status = 400;
                return 'Unsupported file type';
            }

        } catch (error: any) {
            logger.error({ err: error }, '❌ Get file error');
            if (error.code === 'NoSuchKey' || error.code === 'NotFound') {
                set.status = 404;
                return 'File not found in storage';
            }
            set.status = 500;
            return 'Internal Server Error';
        }
    }
}
