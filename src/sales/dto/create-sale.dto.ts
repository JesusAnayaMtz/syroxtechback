import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateSaleItemDto } from "./create-sale-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSaleDto {

    @IsOptional()
    @IsBoolean()
    canceled?: boolean;

    @ApiProperty({
        description: 'Id del cliente',
        example: '7bde803a-049b-40bb-bcfd-d8fb1138bac0',
        required: true
    })
    @IsString()
    @IsOptional()
    clientId: string | "Cliente General";

    @ApiProperty({
        description: 'Lista de items de la venta',
        type: [CreateSaleItemDto],
        example: [
            {
                productId: '8ea5f9ec-839d-4451-8d8b-d0f988c703fe',
                quantity: 1,
            },
            {
                productId: '3f3bb72c-57e2-4905-becb-7e5ed9b9e20f',
                quantity: 1,
            }
        ],
        required: true
    })
    @IsNotEmpty()
    @IsArray()
    items: CreateSaleItemDto[]
}
