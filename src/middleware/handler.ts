import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

//Error handler middleware
export function handler(
    err: any, req: Request, res: Response, next: NextFunction
) {
    //If error is a Zod error, return 400 error
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "invalid error",
            errors: err.message,
        });
    }
    //If error is not a Zod error, pass to next middleware
    next(err)
}