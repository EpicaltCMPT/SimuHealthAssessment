import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

//Register user controller
export const register = async (req: Request, res: Response, next: NextFunction) => {

    //Validates request body, registers user, and returns user
    try {
        const { username, password } = req.body;
        const user = await authService.register(username, password);
        res.status(201).json(user);
    } catch (error) {
        //If error, pass to error handler
        next(error);
    }
}

//Login user controller
export const login = async (req: Request, res: Response, next: NextFunction) => {
    //Validates request body, logs in user, and returns token
    try {
        const { username, password } = req.body;
        const result = await authService.login(username, password);
        res.json({result});
    } catch (error) {
        //If error, pass to error handler
        next(error);
    }
}
    