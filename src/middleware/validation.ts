import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

//Validation middleware
export const validate =
	(schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
		try {
			//For GET requests, validate query params
			//For others, validate body
			const dataToValidate = req.method === "GET" ? req.query : req.body;
			schema.parse(dataToValidate);
			next();
		} catch (error) {
			//If error, pass to error handler
			next(error);
		}
	};
