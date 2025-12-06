/**
 * Creates a standardized success response object.
 * @param data The payload to be sent.
 * @param message A descriptive success message.
 * @returns A standardized success response object.
 */
export const success = <T>(data: T, message: string = 'Operation successful') => {
    return {
        success: true,
        message,
        data,
    };
};

/**
 * Creates a standardized error response object.
 * This is designed to be used with Elysia's `error()` helper or a central error handler.
 * @param message A user-friendly error message.
 * @param details Optional technical details or error object.
 * @returns A standardized error response object.
 */
export const fail = (message: string, details?: any) => {
    const response: {
        success: false;
        message: string;
        details?: any;
    } = {
        success: false,
        message,
    };

    if (details) {
        response.details = details;
    }

    return response;
};