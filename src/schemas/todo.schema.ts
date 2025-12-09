import { z } from "zod";

//Create todo schema
export const createTodoSchema = z.object({
	description: z.string().min(1),
	category: z.string().optional(),
});

//Update todo schema
export const updateTodoSchema = z.object({
	description: z.string().min(1).optional(),
	category: z.string().optional(),
	completed: z.boolean().optional(),
});

//Filter todo schema
export const filterTodoSchema = z.object({
	completed: z.string().optional(),
	category: z.string().optional(),
	description: z.string().optional(),
});
