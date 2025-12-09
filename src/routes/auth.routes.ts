import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middleware/validation";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const router = Router();

//Register user route
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
export default router;
