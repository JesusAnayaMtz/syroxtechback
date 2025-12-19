import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseProductDto } from './dto/response-product.dto';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';


@Injectable()
export class ProductsService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }


  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const productExist = await this.prisma.product.findUnique({
      where: {
        name: createProductDto.name
      }
    })

    if (productExist) {
      throw new ConflictException('El Producto ya existe')
    }

    let imageUrl = null;
    if (file) {
      const result = await this.cloudinaryService.uploadImage(file);
      // Ensure result is UploadApiResponse to access secure_url
      if ('secure_url' in result) {
        imageUrl = result.secure_url;
      }
    }

    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
        imageUrl,
      },
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
      throw new NotFoundException('Producto no encontrado');
    }
    return ResponseProductDto.fromPrisma(productExist)
  }

  async update(id: string, updateProductDto: UpdateProductDto, file: Express.Multer.File) {
    const productExist = await this.prisma.product.findUnique({
      where: {
        id,
      },
    })
    if (!productExist) {
      throw new NotFoundException('Producto no encontrado');
    }

    let imageUrl = productExist.imageUrl;
    if (file) {
      const result = await this.cloudinaryService.uploadImage(file);
      if ('secure_url' in result) {
        imageUrl = result.secure_url;
      }
    }

    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...updateProductDto,
        imageUrl,
      },
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
      throw new NotFoundException('Producto no encontrado');
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
      throw new NotFoundException('Producto no encontrado');
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
