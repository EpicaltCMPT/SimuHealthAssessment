import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

//Interface for authenticated todo request
export interface AuthenticatedTodoRequest extends Request {
	user?: { userId: string };
}

//Authenticate todo request
export function authenticateTodo(
	req: AuthenticatedTodoRequest,
	res: Response,
	next: NextFunction,
) {
	//Get header and checks if it exists
	const authHeader = req.headers.authorization;
	if (!authHeader)
		return res.status(401).json({ message: "Unauthorized: No token provided" });

	//Gets token from splitting the header
	const token = authHeader.replace("Bearer ", "");

	//Tries to verify token and returns user id if successful
	try {
		//Verifies the JWT
		const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_key");

		//If decoded is a string or userId is not found, throw error
		if (typeof decoded === "string" || !decoded.userId)
			throw new Error("Invalid token");

		//Gets user id from decoded token
		req.user = { userId: decoded.userId };
		next();
	} catch (_error) {
		return res.status(401).json({ message: "Unauthorized: Invalid token" });
	}
}
