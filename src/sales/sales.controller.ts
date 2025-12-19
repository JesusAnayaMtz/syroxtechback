import { Controller, Get, Post, Body, Param, Delete, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth()
@Controller('sales')
@UseGuards(JwtAuthGuard)
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @Post()
  create(@Body() createSaleDto: CreateSaleDto, @Request() req) {
    const userId = req.user.sub;
    if (!userId) {
      throw new UnauthorizedException('User not found in token');
    }
    return this.salesService.create(createSaleDto, userId);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }
}
