import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        description: 'Nombre de la categoria',
        example: 'Electronica',
        minLength: 3,
        maxLength: 50,
    })
    @IsString()
    @IsNotEmpty({ message: 'El nombre del producto no puede esta vacio' })
    @MinLength(3, { message: 'El nombre del producto debe tener al menos 5 caracteres' })
    @MaxLength(50, { message: 'El nombre del producto debe tener menos de 50 caracteres' })
    name: string;

    @ApiProperty({
        description: 'Descripcion del producto',
        example: 'Electronica',
        minLength: 3,
        maxLength: 150,
    })
    @IsString()
    @IsNotEmpty({ message: 'La descripcion del producto no puede esta vacio' })
    @MinLength(3, { message: 'La descripcion del producto debe tener al menos 5 caracteres' })
    @MaxLength(150, { message: 'La descripcion del producto debe tener menos de 150 caracteres' })
    description: string;

    @ApiProperty({
        description: 'Precio del producto',
        example: 100,
    })
    @IsNotEmpty({ message: 'El precio del producto no puede esta vacio' })
    @IsNumber()
    price: number;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        description: 'Id de la categoria',
        example: '12345678-1234-1234-1234-123456789012',
    })
    @IsString()
    @IsUUID()
    @IsNotEmpty({ message: 'El id de la categoria no puede esta vacio' })
    categoryId: string;
}
