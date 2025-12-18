import { Product } from "@prisma/client";

export class ResponseProductDto {
    id: string;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    categoryName: string;
    imageUrl: string | null;
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
            imageUrl: product.imageUrl,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }
    }
}   