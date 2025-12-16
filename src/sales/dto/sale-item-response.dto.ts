import { SaleItem } from "@prisma/client";

export class SaleItemResponseDto {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;

    static fromPrisma(item: SaleItem): SaleItemResponseDto {
        return {
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice.toNumber()
        }
    }
}