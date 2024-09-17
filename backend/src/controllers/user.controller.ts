import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";
import { UpdateUserDto } from "../dto/update.user.dto";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async create(@Body() user: Partial<User>): Promise<User> {
        return await this.userService.create(user);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get(":id")
    async findAllById(@Param("id") id: string): Promise<User | null> {
        return await this.userService.findAllById(Number(id));
    }

    @Put(":id")
    async update(
        @Param("id") id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.userService.update(Number(id), updateUserDto);
    }

    @Delete(":id")
    async remove(@Param("id") id: string): Promise<void> {
        return await this.userService.remove(Number(id));
    }
}
