/**
 * Base class for custom HTTP errors, allowing for a status code.
 */
export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/**
 * Represents a 400 Bad Request error.
 * @example throw new BadRequestError("Invalid email format");
 */
export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad Request') {
    super(400, message);
  }
}

/**
 * Represents a 401 Unauthorized error.
 * @example throw new UnauthorizedError("Authentication required");
 */
export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
  }
}

/**
 * Represents a 404 Not Found error.
 * @example throw new NotFoundError("User not found");
 */
export class NotFoundError extends HttpError {
  constructor(message: string = 'Not Found') {
    super(404, message);
  }
}

/**
 * Represents a 500 Internal Server Error.
 */
export class InternalServerError extends HttpError {
    constructor(message: string = 'Internal Server Error') {
      super(500, message);
    }
  }