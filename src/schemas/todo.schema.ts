import { z } from "zod";

export const createTodoSchema = z.object({
    description: z.string().min(1),
    category: z.string().optional(),
});

export const updateTodoSchema = z.object({
    description: z.string().min(1).optional(),
    category: z.string().optional(),
    completed: z.boolean().optional(),
});

export const filterTodoSchema = z.object({
    completed: z.boolean().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
});