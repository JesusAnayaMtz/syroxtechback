import { ApiProperty } from "@nestjs/swagger";
import { Category } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ResponseCategoryDto {
    @ApiProperty({
        description: 'ID único de la categoría',
        example: 'clx1234567890abcdef',
    })
    @Expose()
    id: string;

    @ApiProperty({
        description: 'Nombre de la categoría',
        example: 'Electrónica',
    })
    @Expose()
    name: string;

    @ApiProperty({
        description: 'Estado de la categoría',
        example: true,
    })
    @Expose()
    isActive: boolean;

    @ApiProperty({
        description: 'Fecha de creación',
        example: '2024-01-15T10:30:00.000Z',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        description: 'Fecha de última actualización',
        example: '2024-01-15T10:30:00.000Z',
    })
    @Expose()
    updatedAt: Date;

    static fromPrisma(prismaCategory: Category): ResponseCategoryDto {
        return {
            id: prismaCategory.id,
            name: prismaCategory.name,
            isActive: prismaCategory.isActive,
            createdAt: prismaCategory.createdAt,
            updatedAt: prismaCategory.updatedAt,
        };
    }

}