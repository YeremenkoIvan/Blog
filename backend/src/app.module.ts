import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./core/config";
import { UserModule, CommentsModule } from "./modules/index";
import { User, PostEntity, Token, Comment } from "./entities/index";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: config.DB_HOST,
            port: parseInt(config.DB_PORT, 10),
            username: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            entities: [User, PostEntity, Token, Comment],
            synchronize: true
            // logging: true
        }),
        UserModule,
        CommentsModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
