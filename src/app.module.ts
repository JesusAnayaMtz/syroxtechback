import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), PrismaModule, CategoriesModule, ProductsModule, UsersModule, AuthModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


