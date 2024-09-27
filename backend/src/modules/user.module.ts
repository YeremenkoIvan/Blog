import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "../controllers/index";
import { UserService } from "../services/index";
import { User, PostEntity } from "../entities/index";

@Module({
    imports: [TypeOrmModule.forFeature([User, PostEntity])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
