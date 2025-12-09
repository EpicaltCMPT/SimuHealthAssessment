import { todoRepo } from "../repo/todo.repo";
import { todo } from "../models/todo.model";

//Todo service
class TodoService {

    //Create a new todo
    createTodos(ownerId: string, description: string, category?: string) {
        return todoRepo.createTodo(ownerId, description, category);
    }

    //Get all todos based on filters
    getAllTodos(filters: any): todo[] {
        const todos = todoRepo.GetAllTodos();

        //Filters todos based on filters
        return todos.filter((todo) => {

            //Edge cases: checks if description and category are provided
            if (filters.description && !todo.description.includes(filters.description)) return false;
            if (filters.category && todo.category !== filters.category) return false;

            //Checks if completed is provided
            if (filters.completed !== undefined) {

                //Converts filters.completed to boolean
                const ifcompleted = filters.completed === "true";
                if (todo.completed !== ifcompleted) return false;
            }

            return true;
        });
    }

    updateTodo(id: string, userId: string, update: Partial<todo>) {

        //Gets todo by id, if not found, throw error or not the owner
        const todo = todoRepo.GetTodoByID(id);
        if (!todo) throw new Error("Todo not found");
        if (todo.ownerId !== userId) throw new Error("Unauthorized: You are not the owner of this todo");

        //Updates todo
        return todoRepo.updateTodo(id, update);
    }

    deleteTodo(id: string, userId: string) {

        //Gets todo by id, if not found, throw error or not the owner
        const todo = todoRepo.GetTodoByID(id);
        if (!todo) throw new Error("Todo not found");
        if (todo.ownerId !== userId) throw new Error("Unauthorized: You are not the owner of this todo");

        //Deletes todo
        return todoRepo.deleteTodo(id);
    }
}

export const todoService = new TodoService();
