import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    UseGuards,
    Request,
    Delete,
    HttpCode,
    UnauthorizedException,
    NotFoundException,
    ConflictException
} from "@nestjs/common";
import { UserService } from "../services/index";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("register")
    @HttpCode(201)
    async register(
        @Body("username") username: string,
        @Body("email") email: string,
        @Body("password") password: string
    ): Promise<{ status: string; message?: string; token?: string }> {
        try {
            return this.userService.register(username, email, password);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new ConflictException("Username or email already exists");
            }
            throw error;
        }
    }

    @Post("login")
    @HttpCode(200)
    async login(
        @Body("username") username: string,
        @Body("password") password: string
    ): Promise<{ status: string; message?: string; token?: string }> {
        try {
            return this.userService.login(username, password);
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException("Invalid credentials");
            }
            throw error;
        }
    }

    @Get("/getByToken")
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async getUserByToken(@Request() req) {
        const token = req.headers["authorization"];
        if (!token) {
            throw new UnauthorizedException("Token is missing");
        }

        const user = await this.userService.getUserByToken(token);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard)
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Post("posts")
    @HttpCode(201)
    async createPostForUser(
        @Body("userId") userId: number,
        @Body("title") title: string,
        @Body("category") category: string,
        @Body("tags") tags: string,
        @Body("content") content: string
    ) {
        const post = await this.userService.createPostForUser(
            userId,
            title,
            category,
            tags,
            content
        );
        if (!post) {
            throw new NotFoundException("User not found");
        }
        return post;
    }

    @Get("posts")
    @HttpCode(200)
    getAllPosts() {
        return this.userService.getAllPosts();
    }

    @Delete("")
    @HttpCode(204)
    async deleteUserByToken(@Request() req) {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new UnauthorizedException("Authorization header is missing");
        }

        await this.userService.deleteUser(authHeader);

        return;
    }
}
