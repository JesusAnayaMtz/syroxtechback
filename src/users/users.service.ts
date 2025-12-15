import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }


  async findAllActive() {
    const users = await this.prisma.user.findMany({
      where: {
        isActive: true
      }
    })

    return users.map(user => ResponseUserDto.fromPrisma(user))
  }

  async findAll() {
    const users = await this.prisma.user.findMany()

    return users.map(user => ResponseUserDto.fromPrisma(user))
  }

  async findOne(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        isActive: true
      }
    })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    return ResponseUserDto.fromPrisma(user)
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        id: userId,
        isActive: true
      }
    })

    if (!userExist) {
      throw new Error('Usuario no encontrado')
    }

    const user = await this.prisma.user.update({
      where: {
        id: userId,
        isActive: true
      },
      data: updateUserDto
    })

    return ResponseUserDto.fromPrisma(user)
  }

  async remove(id: string) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        id,
        isActive: true
      }
    })

    if (!userExist) {
      throw new Error('Usuario no encontrado')
    }

    const user = await this.prisma.user.update({
      where: {
        id,
        isActive: true
      },
      data: {
        isActive: false
      }
    })

    return ResponseUserDto.fromPrisma(user)
  }
}
