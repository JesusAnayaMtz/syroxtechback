import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';


@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async register(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    //validamos que el usuario no exista
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (userExists) {
      throw new BadRequestException('El usuario ya existe');
    }

    const hashedPassword = await hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword
      }
    })

    return ResponseUserDto.fromPrisma(user)

  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email
      }
    })

    if (!user) {
      throw new UnauthorizedException('Credenciales Invalidas')
    }

    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales Invalidas')
    }

    const payload = { sub: user.id, email: user.email }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
