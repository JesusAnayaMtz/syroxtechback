import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseProductDto } from './dto/response-product.dto';


@Injectable()
export class ProductsService {

  constructor(private readonly prisma: PrismaService) { }


  async create(createProductDto: CreateProductDto) {
    //Valida que el producto no exista
    const productExist = await this.prisma.product.findUnique({
      where: {
        name: createProductDto.name
      }
    })

    if (productExist) {
      throw new ConflictException('El Producto ya existe')
    }

    const product = await this.prisma.product.create({
      data: createProductDto,
      include: {
        category: true
      }
    })

    return ResponseProductDto.fromPrisma(product)
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        category: true
      }
    })
    return products.map(product => ResponseProductDto.fromPrisma(product))
  }

  async findOne(id: string) {
    const productExist = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true
      }
    })
    if (!productExist) {
      throw new Error('Product not found');
    }
    return ResponseProductDto.fromPrisma(productExist)
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productExist = await this.prisma.product.findUnique({
      where: {
        id,
      },
    })
    if (!productExist) {
      throw new Error('Product not found');
    }
    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: updateProductDto,
      include: {
        category: true
      }
    })
    return ResponseProductDto.fromPrisma(product)
  }

  async remove(id: string) {
    const productExist = await this.prisma.product.findUnique({
      where: {
        id,
      },
    })
    if (!productExist) {
      throw new Error('Product not found');
    }
    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
      include: {
        category: true
      }
    })
    return ResponseProductDto.fromPrisma(product)
  }

  async restoreProduct(id: string) {
    const productExist = await this.prisma.product.findUnique({
      where: {
        id,
      },
    })
    if (!productExist) {
      throw new Error('Product not found');
    }
    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
      include: {
        category: true
      }
    })
    return ResponseProductDto.fromPrisma(product)
  }
}
