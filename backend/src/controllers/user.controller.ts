import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    UseGuards,
    Request
} from "@nestjs/common";
import { UserService } from "../services/index";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("register")
    async register(
        @Body("username") username: string,
        @Body("email") email: string,
        @Body("password") password: string
    ): Promise<{ token: string }> {
        return this.userService.register(username, email, password);
    }

    @Post("login")
    async login(
        @Body("username") username: string,
        @Body("password") password: string
    ): Promise<{ token: string }> {
        return this.userService.login(username, password);
    }

    // Получение пользователя по токену
    @Get("/getByToken")
    @UseGuards(AuthGuard) // Используйте охранник для защиты маршрута
    async getUserByToken(@Request() req) {
        const token = req.headers["authorization"]; // Извлекаем токен из заголовка
        return this.userService.getUserByToken(token); // Передаем токен в сервис
    }

    // Получение всех пользователей с их постами
    @Get()
    @UseGuards(AuthGuard)
    getAllUsers() {
        return this.userService.getAllUsers();
    }

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
