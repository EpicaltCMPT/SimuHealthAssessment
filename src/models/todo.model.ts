//Todo model
export interface todo {
    id: string;
    ownerId: string;
    description: string;
    category?: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}