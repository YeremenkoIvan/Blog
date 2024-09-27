import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, PostEntity } from "../entities/index";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>
    ) {}

    // Создать нового пользователя
    async createUser(
        username: string,
        email: string,
        password: string
    ): Promise<User> {
        const user = this.userRepository.create({ username, email, password });
        return await this.userRepository.save(user);
    }

    // Получить всех пользователей с их постами
    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find({ relations: ["posts"] });
    }

    // Создать новый пост для пользователя
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

    // Получить все посты
    async getAllPosts(): Promise<PostEntity[]> {
        return await this.postRepository.find({ relations: ["user"] });
    }
}
