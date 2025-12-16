import { IsNumber, IsUUID, Min } from "class-validator";

export class CreateSaleItemDto {

    @IsUUID()
    productId: string;

    @IsNumber()
    @Min(1)
    quantity: number;
}