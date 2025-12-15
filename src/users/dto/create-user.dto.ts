import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Jesus Anaya',
        minLength: 3,
        maxLength: 50,
    })
    @IsString()
    @MinLength(3, { message: 'El nombre del usuario debe tener al menos 3 caracteres' })
    @MaxLength(50, { message: 'El nombre del usuario debe tener menos de 50 caracteres' })
    @IsNotEmpty({ message: 'El nombre del usuario no puede estar vacio' })
    name: string

    @ApiProperty({
        description: 'Correo del usuario',
        example: 'jesus.anaya@prueba.com',
    })
    @IsEmail({}, { message: 'El correo del usuario debe ser un correo valido' })
    @IsNotEmpty({ message: 'El correo del usuario no puede estar vacio' })
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: '12345678',
        minLength: 8,
    })
    @IsString()
    @MinLength(8, { message: 'La contraseña del usuario debe tener al menos 8 caracteres' })
    @IsNotEmpty({ message: 'La contraseña del usuario no puede estar vacio' })
    password: string;

    @ApiProperty({
        description: 'Estado del usuario',
        example: true,
        default: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}
