import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    //usamos canActivate para validar el token
    constructor(private jwtService: JwtService) { }

    //validamos el token
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) throw new UnauthorizedException('Token not found');

        try {
            const payload = this.jwtService.verify(token);
            request.user = payload; // Guardamos el payload en el request
            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
