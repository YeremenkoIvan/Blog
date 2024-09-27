import { Controller, Post, Get, Param, Body } from "@nestjs/common";
import { UserService } from "../services/index";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    // Создание пользователя
    @Post()
    createUser(
        @Body("username") username: string,
        @Body("email") email: string,
        @Body("password") password: string
    ) {
        return this.userService.createUser(username, email, password);
    }

    // Получение всех пользователей с их постами
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    // Создание поста для пользователя
    @Post(":userId/posts")
    createPostForUser(
        @Param("userId") userId: number,
        @Body("title") title: string,
        @Body("category") category: string,
        @Body("tags") tags: string,
        @Body("content") content: string
    ) {
        return this.userService.createPostForUser(
            userId,
            title,
            category,
            tags,
            content
        );
    }

    // Получение всех постов
    @Get("posts")
    getAllPosts() {
        return this.userService.getAllPosts();
    }
}
