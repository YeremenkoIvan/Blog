import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsController } from "../controllers/index";
import { CommentsService } from "../services/index";
import { Comment, User, PostEntity } from "../entities/index";

@Module({
    imports: [TypeOrmModule.forFeature([Comment, User, PostEntity])],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule {}
