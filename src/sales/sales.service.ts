import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaleResponseDto } from './dto/sale-response.dto';

@Injectable()
export class SalesService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createSaleDto: CreateSaleDto, userId: string) {
    //Validamos que los productos existan
    const productsIds = createSaleDto.items.map(item => item.productId);
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productsIds }
      }
    })

    if (products.length !== productsIds.length) {
      throw new NotFoundException('Uno o mas productos no existen')
    }

    //si lor proudtcos existen calculamo el total y obtenemos precios
    const items = createSaleDto.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product!.price
      }
    })

    //ahora calculamo el total
    const total = items.reduce((sum, item) => sum + item.quantity * Number(item.unitPrice), 0);

    const sale = await this.prisma.sale.create({
      data: {
        total,
        userId,
        items: {
          create: items,
        },
      },
      include: {
        items: true
      }
    })

    return SaleResponseDto.fromPrisma(sale)
  }

  async findAll() {
    const sales = await this.prisma.sale.findMany({
      include: {
        items: true
      }
    })

    return sales.map(SaleResponseDto.fromPrisma)
  }

  async findAllActive() {
    const sales = await this.prisma.sale.findMany({
      where: {
        canceled: false
      },
      include: {
        items: true
      }
    })

    return sales.map(SaleResponseDto.fromPrisma)
  }

  async findOne(id: string) {
    const sale = await this.prisma.sale.findUnique({
      where: {
        id
      },
      include: {
        items: true
      }
    })

    if (!sale) {
      throw new NotFoundException('Venta no encontrada')
    }

    return SaleResponseDto.fromPrisma(sale)
  }

  async remove(id: string) {
    const saleExist = await this.prisma.sale.findUnique({
      where: {
        id
      }
    })

    if (!saleExist) {
      throw new NotFoundException('Venta no encontrada')
    }

    //solo cambiamos el estatus de caceled a true
    const sale = await this.prisma.sale.update({
      where: {
        id
      },
      data: {
        canceled: true
      },
      include: {
        items: true
      }
    })

    return SaleResponseDto.fromPrisma(sale)
  }

}
