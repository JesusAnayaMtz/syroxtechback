import { Sale, SaleItem } from "@prisma/client";
import { SaleItemResponseDto } from "./sale-item-response.dto";

export class SaleResponseDto {
    id: string;
    total: number;
    userId: string;
    canceled: boolean;
    createdAt: Date;
    items: SaleItemResponseDto[];

    static fromPrisma(sale: Sale & { items: SaleItem[] }): SaleResponseDto {
        return {
            id: sale.id,
            total: sale.total.toNumber(),
            userId: sale.userId,
            canceled: sale.canceled,
            createdAt: sale.createdAt,
            items: sale.items.map(item => SaleItemResponseDto.fromPrisma(item))
        }
    }
}