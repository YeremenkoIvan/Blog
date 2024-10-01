import {
    Injectable,
    Inject,
    forwardRef,
    UnauthorizedException,
    ConflictException
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
    ): Promise<{ status: string; message?: string; token?: string }> {
        const newUser = this.userRepository.create({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        });

        try {
            const savedUser = await this.userRepository.save(newUser);
            const tokenEntity = await this.tokenService.createToken(savedUser);

            return {
                status: "200", // Успех
                token: tokenEntity.token,
                message: "Registration successful"
            };
        } catch (error) {
            if (error.code === "23505") {
                // Код конфликта для уникальных ограничений
                return {
                    status: "409", // Конфликт
                    message: "Username or email already exists"
                };
            }
            // В случае других ошибок можно вернуть статус 500
            return {
                status: "500",
                message: "An error occurred during registration"
            };
        }
    }

    async login(
        username: string,
        password: string
    ): Promise<{ status: string; message?: string; token?: string }> {
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            return {
                status: "409",
                message: "User not found"
            };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                status: "409",
                message: "Invalid password"
            };
        }

        const tokenEntity = await this.tokenService.createToken(user);
        return {
            status: "200",
            message: "Login succesful",
            token: tokenEntity.token
        };
    }

    async getUserByToken(token: string): Promise<User | null> {
        const tokenData = await this.tokenService.findByToken(token);
        if (tokenData) {
            return this.userRepository.findOne({
                where: { id: tokenData.user.id }
            });
        }
        return null;
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

    async deleteUser(token: string): Promise<void> {
        const tokenData = await this.tokenService.findByToken(token);

        if (!tokenData) {
            throw new UnauthorizedException("Invalid token");
        }

        await this.userRepository.delete(tokenData.user.id);
    }
}
