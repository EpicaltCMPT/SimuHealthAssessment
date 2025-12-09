import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { registerSchema, loginSchema } from "./auth.schema";
import { validate } from "../middleware/validation";

const router = Router();

//Register user route
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
export default router;