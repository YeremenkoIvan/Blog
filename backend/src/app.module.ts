import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import config from "./core/config";
import { UserModule } from "./modules/index";
import { User, Role } from "./entities/index";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: config.DB_HOST,
            port: parseInt(config.DB_PORT, 10),
            username: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            entities: [User, Role],
            synchronize: true
            // logging: true
        }),
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
