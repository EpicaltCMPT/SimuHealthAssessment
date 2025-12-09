import { Router } from "express";
import {
	createTodo,
	deleteTodo,
	getAllTodo,
	updateTodo,
} from "../controllers/todo.controller";
import { authenticateTodo } from "../middleware/todo.validate";
import { validate } from "../middleware/validation";
import {
	createTodoSchema,
	filterTodoSchema,
	updateTodoSchema,
} from "../schemas/todo.schema";

const router = Router();

//Publically read
router.get("/", validate(filterTodoSchema), getAllTodo);

//Protected routes, create/update/delete todos
router.post("/", authenticateTodo, validate(createTodoSchema), createTodo);
router.patch("/:id", authenticateTodo, validate(updateTodoSchema), updateTodo);
router.delete("/:id", authenticateTodo, deleteTodo);

export default router;
