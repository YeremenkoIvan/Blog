import {
    Injectable,
    Inject,
    forwardRef,
    UnauthorizedException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, PostEntity } from "../entities/index";
import { TokenService } from "./index";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
        @Inject(forwardRef(() => TokenService))
        private readonly tokenService: TokenService
    ) {}

    async register(
        username: string,
        email: string,
        password: string
    ): Promise<{ token: string }> {
        const newUser = this.userRepository.create({
            username,
            email,
            password: await bcrypt.hash(password, 10) // Хешируем пароль
        });
        const savedUser = await this.userRepository.save(newUser);
        const tokenEntity = await this.tokenService.createToken(savedUser);

        return { token: tokenEntity.token };
    }

    async login(
        username: string,
        password: string
    ): Promise<{ token: string }> {
        // Находим пользователя по имени пользователя
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            throw new UnauthorizedException("Пользователь не найден"); // Если пользователь не найден
        }

        // Сравниваем введенный пароль с сохраненным хешем
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Неверный пароль"); // Если пароль неверный
        }

        // Создаем токен, если учетные данные верны
        const tokenEntity = await this.tokenService.createToken(user);
        return { token: tokenEntity.token };
    }

    async getUserByToken(token: string): Promise<User | null> {
        // Получите токен без "Bearer " если это включено
        // const actualToken = token.replace("Bearer ", "");

        const tokenData = await this.tokenService.findByToken(token);
        if (tokenData) {
            return this.userRepository.findOne({
                where: { id: tokenData.user.id } // Предполагается, что в Token есть поле user, которое ссылается на пользователя
            });
        }
        return null; // Возвращаем null, если токен не найден
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find({ relations: ["posts"] });
    }

    async createPostForUser(
        userId: number,
        title: string,
        category: string,
        tags: string,
        content: string
    ): Promise<PostEntity> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });
        if (!user) {
            throw new Error("User not found");
        }

        const post = this.postRepository.create({
            title,
            category,
            tags,
            content,
            user
        });
        return await this.postRepository.save(post);
    }

    async getAllPosts(): Promise<PostEntity[]> {
        return await this.postRepository.find({ relations: ["user"] });
    }
}
