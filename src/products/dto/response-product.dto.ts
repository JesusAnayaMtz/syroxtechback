import { Product } from "@prisma/client";

export class ResponseProductDto {
    id: string;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    categoryName: string;
    createdAt: Date;
    updatedAt: Date;

    static fromPrisma(product: Product & { category: { name: string } }): ResponseProductDto {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price.toNumber(),
            isActive: product.isActive,
            categoryName: product.category.name,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }
    }
}   