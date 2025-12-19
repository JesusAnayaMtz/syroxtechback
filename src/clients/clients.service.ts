import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseClientDto } from './dto/response-client.dto';

@Injectable()
export class ClientsService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createClientDto: CreateClientDto) {

    const { email } = createClientDto;
    //Validamos que el cliente no exista
    const clientExits = await this.prisma.client.findUnique({
      where: { email: createClientDto.email }
    })

    if (clientExits) {
      throw new BadRequestException('El cliente ya existe');
    }

    const client = await this.prisma.client.create({
      data: createClientDto
    })

    return ResponseClientDto.fromClient(client)
  }

  async findAll() {
    const clients = await this.prisma.client.findMany({
      include: {
        sales: true
      }
    })

    return clients.map(client => ResponseClientDto.fromClient(client))
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        sales: true
      }
    })

    if (!client) {
      throw new BadRequestException('El cliente no existe');
    }

    return ResponseClientDto.fromClient(client)
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    //validar que el cliente exista
    const client = await this.prisma.client.findUnique({
      where: { id }
    })

    if (!client) {
      throw new NotFoundException('El cliente no existe');
    }

    //validamos que el email no exista
    const clientExits = await this.prisma.client.findUnique({
      where: { email: updateClientDto.email }
    })

    if (clientExits) {
      throw new BadRequestException('Ya existe un cliente con el correo proporcionado');
    }

    const clientUpdated = await this.prisma.client.update({
      where: { id },
      data: updateClientDto
    })

    return ResponseClientDto.fromClient(clientUpdated)
  }

  async remove(id: string) {
    //validamos que el cliente exista
    const client = await this.prisma.client.findUnique({
      where: { id }
    })

    if (!client) {
      throw new NotFoundException('El cliente no existe');
    }

    //no lo eliminamos solo lo desactivamos
    const clientDeleted = await this.prisma.client.update({
      where: { id },
      data: { isActive: false }
    })

    return ResponseClientDto.fromClient(clientDeleted)
  }

  async restore(id: string) {
    //validamos que el cliente exista
    const client = await this.prisma.client.findUnique({
      where: { id }
    })

    if (!client) {
      throw new NotFoundException('El cliente no existe');
    }

    //no lo eliminamos solo lo desactivamos
    const clientRestored = await this.prisma.client.update({
      where: { id },
      data: { isActive: true }
    })

    return ResponseClientDto.fromClient(clientRestored)
  }
}
