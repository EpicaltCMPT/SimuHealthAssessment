import { z } from "zod";

//Register user schema
export const registerSchema = z.object({
	username: z.string(),
	password: z.string().min(6),
});

//Login user schema
export const loginSchema = z.object({
	username: z.string(),
	password: z.string().min(6),
});
