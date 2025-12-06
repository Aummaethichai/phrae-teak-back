import { Elysia } from 'elysia';
import { fail } from '../utils/response';
import { HttpError } from '../utils/errors';
import { logger } from '../utils/logger';
import { Prisma } from '../generated/prisma';

export const errorHandler = new Elysia({ name: 'plugin.errorHandler' })
    .onError(({ code, error, set }) => {
        // Log the full error for debugging purposes
        logger.error(`Error caught: ${error?.message}`, error.stack);

        // Handle our custom HttpErrors
        if (error instanceof HttpError) {
            set.status = error.status;
            return fail(error.message);
        }

        // Handle Prisma-specific errors for better client messages
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Example: Unique constraint violation
            if (error.code === 'P2002') {
                set.status = 409; // Conflict
                const target = (error.meta?.target as string[])?.join(', ');
                return fail(`Conflict: A record with this ${target || 'value'} already exists.`);
            }
            // Add more specific Prisma error codes as needed
            set.status = 400;
            return fail('Database request error.', error.message);
        }

        // Handle Elysia's internal validation errors
        if (code === 'VALIDATION') {
            set.status = 400;
            return fail('Validation failed', error.all);
        }

        // Fallback for any other unexpected errors
        set.status = 500;
        return fail('An unexpected internal server error occurred.');
    });