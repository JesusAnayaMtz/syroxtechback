import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateClientDto {

    @ApiProperty({
        description: 'Nombre del cliente',
        example: 'Antonio Mendeza',
        minLength: 3,
        maxLength: 50,
    })
    @IsString()
    @MinLength(3, { message: 'El nombre del cliente debe tener al menos 3 caracteres' })
    @MaxLength(50, { message: 'El nombre del cliente debe tener menos de 50 caracteres' })
    @IsNotEmpty({ message: 'El nombre del cliente no puede estar vacio' })
    name: string;

    @ApiProperty({
        description: 'Correo del cliente',
        example: 'antonio.mendez@prueba.com',
        minLength: 3,
        maxLength: 50,
    })
    @IsEmail()
    @MinLength(3, { message: 'El correo del cliente debe tener al menos 3 caracteres' })
    @MaxLength(50, { message: 'El correo del cliente debe tener menos de 50 caracteres' })
    @IsNotEmpty({ message: 'El correo del cliente no puede estar vacio' })
    email: string;

    @ApiProperty({
        description: 'Telefono del cliente',
        example: '5212365896',
    })
    @IsString()
    @MinLength(3, { message: 'El telefono del cliente debe tener al menos 3 caracteres' })
    @MaxLength(15, { message: 'El telefono del cliente debe tener menos de 15 caracteres' })
    @IsNotEmpty({ message: 'El telefono del cliente no puede estar vacio' })
    phone: string;

    @ApiProperty({
        description: 'Direccion del cliente',
        example: 'Calle 123, Bosque de las flores, Cuautla, Morelos',
    })
    @IsString()
    @MinLength(3, { message: 'La direccion del cliente debe tener al menos 3 caracteres' })
    @MaxLength(200, { message: 'La direccion del cliente debe tener menos de 200 caracteres' })
    @IsNotEmpty({ message: 'La direccion del cliente no puede estar vacio' })
    address: string;

    @ApiProperty({
        description: 'Codigo postal del cliente',
        example: '62000',
    })
    @IsString()
    @MinLength(3, { message: 'El codigo postal del cliente debe tener al menos 3 caracteres' })
    @MaxLength(8, { message: 'El codigo postal del cliente debe tener menos de 8 caracteres' })
    @IsNotEmpty({ message: 'El codigo postal del cliente no puede estar vacio' })
    zipCode: string;
}
