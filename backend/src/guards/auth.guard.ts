import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException
} from "@nestjs/common";
import { TokenService } from "../services/index";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers["authorization"];

        if (!token) {
            throw new UnauthorizedException("Token not provided");
        }

        const isValid = await this.tokenService.validateToken(token); // Реализуйте метод проверки токена
        if (!isValid) {
            throw new UnauthorizedException("Invalid token");
        }

        return true;
    }
}
