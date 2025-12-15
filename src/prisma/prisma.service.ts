import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    private readonly logger = new Logger('Api-SyroxTech');

    constructor() {
        super({
            log: ['query', 'info', 'warn', 'error'],
            errorFormat: 'colorless',

        })
    }

    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('Database connection established');
        } catch (error) {
            this.logger.error('Database connection failed', error);
        }
    }
    async onModuleDestroy() {
        try {
            await this.$disconnect();
            this.logger.log('Database connection closed');
        } catch (error) {
            this.logger.error('Database connection failed', error);
        }
    }
}
