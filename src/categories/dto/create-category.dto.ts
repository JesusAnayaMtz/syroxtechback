import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, minLength } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({
        description: 'Nombre de la categoria',
        example: 'Electronica',
        minLength: 3,
        maxLength: 50,
    })
    @IsString()
    @IsNotEmpty({ message: 'El nombre de la categoria no puede esta vacio' })
    @MinLength(3, { message: 'El nombre de la categoria debe tener al menos 3 caracteres' })
    @MaxLength(50, { message: 'El nombre de la categoria debe tener menos de 50 caracteres' })
    name: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
