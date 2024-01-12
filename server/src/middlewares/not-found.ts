import { NextFunction, Request, RequestHandler, Response } from "express"

export const notFoundMiddleware: RequestHandler = (req: Request, res: Response,next: NextFunction) => {
    res.status(404).send(`Route doesn't exist`)
}