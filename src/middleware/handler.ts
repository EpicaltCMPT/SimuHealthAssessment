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

    //If error is a JSON parsing error, return 400 error
    if (err instanceof SyntaxError && err.message.includes('JSON')) {
        return res.status(400).json({
            message: "Invalid JSON",
            error: err.message,
        });
    }

    //If error is a generic Error, return 500 error with message
    if (err instanceof Error) {
        if (err.message.includes("Unauthorized") || err.message.includes("Invalid token")) {
            return res.status(401).json({
                message: err.message,
            });
        }
        if (err.message.includes("not found") || err.message.includes("Not found")) {
            return res.status(404).json({
                message: err.message,
            });
        }
        //Default to 500 for other errors
        return res.status(500).json({
            message: err.message || "Internal server error",
        });
    }

    //If error is not recognized, return 500 error
    return res.status(500).json({
        message: "Internal server error",
    });
}