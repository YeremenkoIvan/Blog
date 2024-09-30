import { Injectable, forwardRef, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, Token } from "../entities/index";
import { generateToken } from "src/utils/generateToken";
import { UserService } from "./user.service"; // Убедитесь, что путь правильный

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private tokenRepository: Repository<Token>, // Убедитесь, что репозиторий для Token правильно инжектируется
        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) {}

    async createToken(user: User): Promise<Token> {
        const token = generateToken();
        const newToken = this.tokenRepository.create({ token, user });
        return this.tokenRepository.save(newToken);
    }

    async findByToken(token: string): Promise<Token | undefined> {
        return this.tokenRepository.findOne({
            where: { token },
            relations: ["user"]
        });
    }

    async validateToken(token: string): Promise<boolean> {
        const tokenData = await this.findByToken(token);
        return !!tokenData; // Возвращает true, если токен найден
    }
}
