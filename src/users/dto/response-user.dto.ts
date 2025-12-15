import { User } from "@prisma/client";

export class ResponseUserDto {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    static fromPrisma(user: User): ResponseUserDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
}