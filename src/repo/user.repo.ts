import { User } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';

class UserRepo {
    private users = new Map<string, User>();

    create(hashedPassword: string): User {
        const user: User = {
            id: uuidv4(),
            hashedPassword
        };
        this.users.set(user.id, user);
        return user;
    }

    getID(id: string): User | undefined {
        return this.users.get(id);
    }
}

export const userRepo = new UserRepo();

