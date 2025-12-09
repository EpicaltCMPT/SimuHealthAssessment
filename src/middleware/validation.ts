import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

//Validation middleware
export const validate = (schema: ZodType) => 
    (req: Request, res: Response, next: NextFunction) => {
        try {
            //Parse request body against schema
            schema.parse(req.body);
            next();
        } catch(error) {
            //If error, pass to error handler
            next(error);
        }
}

