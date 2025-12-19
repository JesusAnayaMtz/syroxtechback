import { Client } from "@prisma/client";

export class ResponseClientDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    zipCode: string;
    createdAt: Date;
    updatedAt: Date;

    static fromClient(client: Client): ResponseClientDto {
        return {
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            address: client.address,
            zipCode: client.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        };
    }
}

