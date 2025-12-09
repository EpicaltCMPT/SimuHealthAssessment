import type { NextFunction, Request, Response } from "express";
import type { AuthenticatedTodoRequest } from "../middleware/todo.validate";
import { todoService } from "../services/todo.service";

//Create todo controller to create a new todo
export const createTodo = async (
	req: AuthenticatedTodoRequest,
	res: Response,
	next: NextFunction,
) => {
	//Validates request body, creates todo, and returns todo
	try {
		const userId = req.user?.userId;
		if (!userId) {
			return res
				.status(401)
				.json({ message: "Unauthorized: User not authenticated" });
		}
		//Gets description and category, returns result of creating todos
		const { description, category } = req.body;
		const result = todoService.createTodos(userId, description, category);
		res.status(201).json(result);
		
	} catch (error) {
		//If error, pass to error handler
		next(error);
	}
};

//Get all todos controller to get all todos
export const getAllTodo = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = todoService.getAllTodos(req.query);
		res.json(result);
	} catch (error) {
		next(error);
	}
};

//Update todo controller to update a todo
export const updateTodo = async (
	req: AuthenticatedTodoRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		const userId = req.user?.userId;
		if (!id) {
			return res.status(400).json({ message: "Todo ID is required" });
		}
		if (!userId) {
			return res
				.status(401)
				.json({ message: "Unauthorized: User not authenticated" });
		}
		const result = todoService.updateTodo(id, userId, req.body);
		res.json(result);
	} catch (error) {
		next(error);
	}
};

//Delete todo controller to delete a todo
export const deleteTodo = async (
	req: AuthenticatedTodoRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		const userId = req.user?.userId;
		if (!id) {
			return res.status(400).json({ message: "Todo ID is required" });
		}
		if (!userId) {
			return res
				.status(401)
				.json({ message: "Unauthorized: User not authenticated" });
		}
		const result = todoService.deleteTodo(id, userId);
		res.json(result);
	} catch (error) {
		next(error);
	}
};
