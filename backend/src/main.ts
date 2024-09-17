import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import config from "./core/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(config.PORT);
    console.log(`Application is running on: http://localhost:${config.PORT}`);
}
bootstrap();
