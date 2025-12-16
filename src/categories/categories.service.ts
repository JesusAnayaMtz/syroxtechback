import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseCategoryDto } from './dto/response-category.dto';

@Injectable()
export class CategoriesService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    //validar que la categoria no exista
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        name: createCategoryDto.name
      }
    })

    if (categoryExists) {
      throw new BadRequestException('Categoria ya existe');
    }

    const category = await this.prisma.category.create({
      data: createCategoryDto
    })

    return ResponseCategoryDto.fromPrisma(category);
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();
    return categories.map((category) => ResponseCategoryDto.fromPrisma(category));
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException('Categoria no encontrada');
    }
    return ResponseCategoryDto.fromPrisma(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    //validar que la categoria exista
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!categoryExists) {
      throw new NotFoundException('Categoria no encontrada');
    }

    //validar que el nuevo nombre no exista
    const categoryExists2 = await this.prisma.category.findUnique({
      where: {
        name: updateCategoryDto.name,
      },
    });
    if (categoryExists2) {
      throw new BadRequestException('Categoria ya existe');
    }

    const category = await this.prisma.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
    return ResponseCategoryDto.fromPrisma(category);
  }

  async remove(id: string) {
    //validamos que exista la categoria
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!categoryExists) {
      throw new NotFoundException('Category not found');
    }

    //no se elimina solo se deshabilita
    const category = await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
    return ResponseCategoryDto.fromPrisma(category);
  }

  async restoreCategory(id: string) {
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!categoryExists) {
      throw new NotFoundException('Category not found');
    }
    const category = await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    });
    return ResponseCategoryDto.fromPrisma(category);
  }
}