import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: 'Email del usuario',
        example: 'jesus@prueba.mx',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Password del usuario',
        example: '12345678',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}