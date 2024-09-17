import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "../controllers/index";
import { UserService } from "../services/index";
import { User, Role } from "../entities/index";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]) // Определите сущности для этого модуля
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
