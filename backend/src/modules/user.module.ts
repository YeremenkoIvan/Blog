import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "../controllers/index";
import { UserService, TokenService } from "../services/index";
import { User, PostEntity, Token } from "../entities/index";

@Module({
    imports: [TypeOrmModule.forFeature([User, PostEntity, Token])],
    controllers: [UserController],
    providers: [UserService, TokenService],
    exports: [TokenService]
})
export class UserModule {}
