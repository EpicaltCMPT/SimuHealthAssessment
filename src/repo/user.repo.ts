import { User } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';

class UserRepo {
    //Store users in memory
    private users = new Map<string, User>();

    //Create a new user
    create(username: string, hashedPassword: string): User {
        const user: User = {
            id: uuidv4(),
            username,
            hashedPassword
        };
        this.users.set(user.id, user);
        return user;
    }

    //Returns a user by username
    getUsername(username: string): User | undefined {
        for (const user of this.users.values()) {
            if (user.username === username) {
                return user;
            }
        }
        return undefined;
    }

    //Returns a user by id
    getID(id: string): User | undefined {
        return this.users.get(id);
    }
}

export const userRepo = new UserRepo();

