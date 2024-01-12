export class CustomHttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends CustomHttpError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class NotFoundError extends CustomHttpError {
  constructor(message: string) {
    super(message, 404)
  }
}

export class UnauthorizedError extends CustomHttpError {
  constructor(message: string) {
    super(message, 401)
  }
}
