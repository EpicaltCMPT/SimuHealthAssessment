import { v4 as uuidv4 } from "uuid";
import type { todo } from "../models/todo.model";

class TodoRepo {
	//Store todos in memory
	private todos = new Map<string, todo>();

	//Create a new todo
	createTodo(ownerId: string, description: string, category?: string): todo {
		const todo: todo = {
			id: uuidv4(),
			ownerId,
			description,
			...(category !== undefined && { category }),
			completed: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		this.todos.set(todo.id, todo);
		return todo;
	}

	//Get all todos
	GetAllTodos(): todo[] {
		return [...this.todos.values()];
	}

	//Get todo by id
	GetTodoByID(id: string): todo | undefined {
		return this.todos.get(id);
	}

	//Update todo
	updateTodo(id: string, update: Partial<todo>): todo | undefined {
		//Get todo by id, if not found, return undefined
		const todo = this.todos.get(id);
		if (!todo) return undefined;

		//Update todo
		const updatedTodo = { ...todo, ...update, updatedAt: new Date() };

		//Set updated todo
		this.todos.set(id, updatedTodo);
		return updatedTodo;
	}

	//Delete todo
	deleteTodo(id: string): boolean {
		return this.todos.delete(id);
	}
}

export const todoRepo = new TodoRepo();
