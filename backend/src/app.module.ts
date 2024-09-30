import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./core/config";
import { UserModule } from "./modules/index";
import { User, PostEntity, Token } from "./entities/index";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: config.DB_HOST,
            port: parseInt(config.DB_PORT, 10),
            username: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            entities: [User, PostEntity, Token],
            synchronize: true
            // logging: true
        }),
        UserModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
