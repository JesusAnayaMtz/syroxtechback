import { IsArray, IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import { CreateSaleItemDto } from "./create-sale-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSaleDto {

    @IsOptional()
    @IsBoolean()
    canceled?: boolean;

    @ApiProperty({
        description: 'Lista de items de la venta',
        type: [CreateSaleItemDto],
        example: [
            {
                productId: '12345678-1234-1234-1234-123456789012',
                quantity: 1,
            },
            {
                productId: '12345678-1234-1234-1234-123456789012',
                quantity: 1,
            }
        ],
        required: true
    })
    @IsNotEmpty()
    @IsArray()
    items: CreateSaleItemDto[]
}
