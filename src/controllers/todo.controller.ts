import { Response, NextFunction } from "express";
import { todoService } from "../services/todo.service";
import { AuthenticatedTodoRequest } from "../middleware/todo.validate";

//Create todo controller to create a new todo
export const createTodo = async (req: AuthenticatedTodoRequest, res: Response, next: NextFunction) => {

    //Validates request body, creates todo, and returns todo
    try {

        //Gets description and category, returns result of creating todos
        const { description, category } = req.body;
        const result = todoService.createTodos(req.user!.userId, description, category);
        res.status(201).json(result);
    } catch (error) {

        //If error, pass to error handler
        next(error);
    }
};

//Get all todos controller to get all todos
export const getAllTodo = async (req: AuthenticatedTodoRequest, res: Response, next: NextFunction) => {
    try {
        const result = todoService.getAllTodos(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

//Update todo controller to update a todo
export const updateTodo = async (req: AuthenticatedTodoRequest, res: Response, next: NextFunction) => {
    try {
        const result = todoService.updateTodo(req.params.id!, req.user!.userId, req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

//Delete todo controller to delete a todo
export const deleteTodo = async (req: AuthenticatedTodoRequest, res: Response, next: NextFunction) => {
    try {
        const result = todoService.deleteTodo(req.params.id!, req.user!.userId);
        res.json(result);
    } catch (error) {
        next(error);
    }
};