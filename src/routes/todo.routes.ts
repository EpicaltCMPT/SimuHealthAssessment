import { Router } from "express";
import { authenticateTodo } from "../middleware/todo.validate";
import { createTodo, getAllTodo, updateTodo, deleteTodo } from "../controllers/todo.controller";
import { validate } from "../middleware/validation";
import { createTodoSchema, updateTodoSchema, filterTodoSchema } from "../schemas/todo.schema";

const router = Router();

//Publically read 
router.get('/', validate(filterTodoSchema), getAllTodo);

//Protected routes, create/update/delete todos
router.post('/', authenticateTodo, validate(createTodoSchema), createTodo);
router.patch('/:id', authenticateTodo, validate(updateTodoSchema), updateTodo);
router.delete('/:id', authenticateTodo, deleteTodo);

export default router;