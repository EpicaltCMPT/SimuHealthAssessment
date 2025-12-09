import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepo } from "../repo/user.repo";

export class AuthService {
	//Register user
	async register(username: string, password: string) {
		//Check if user already exists
		const existingUser = userRepo.getUsername(username);

		//If user already exists, throw error
		if (existingUser) throw new Error("User already exists");

		//Hash passowrd and create user
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = userRepo.create(username, hashedPassword);

		//Return user
		return {
			id: user.id,
			username: user.username,
		};
	}

	//Login user
	async login(username: string, password: string) {
		//Checks if user exists
		const user = userRepo.getUsername(username);
		if (!user) throw new Error("Invalid username or password");

		//Validates user password
		const validPassword = await bcrypt.compare(password, user.hashedPassword);
		if (!validPassword) throw new Error("Invalid username or password");

		//Generates JWT token
		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET || "dev_key",
			{ expiresIn: "1h" },
		);

		return { token };
	}
}

export const authService = new AuthService();
