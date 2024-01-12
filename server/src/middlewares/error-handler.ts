import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let customError = {
        statusCode: (err as any).statusCode || 500,
        message: err.message || 'Something went wrong. Try again later.',
    }

    // Handling Duplicate Email Error (Register route)
  if ('code' in err && err.code && err.code === 11000) {
    const email = (err as any).keyValue?.email;
    customError.statusCode = 400;
    customError.message = `${email} is taken. Please provide another email.`;
  }

  // Handling Validation Error (Register route)
  if (err.name === "ValidationError") {
    customError.statusCode = 400;
    customError.message = Object.values((err as any).errors as any[])
      .map((errObject) => errObject.message)
      .join(". ");
  }

  // Handling cast error
  if (err.name === "CastError") {
    customError.statusCode = 404;
    customError.message = `Id: ${(err as any).value} doesn't exist`;
  }
  // console.log(err);
  return res.status(customError.statusCode).json({ msg: customError.message });
}

