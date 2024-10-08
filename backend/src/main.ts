import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import config from "./core/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: "http://localhost:3000", // Домен, который может делать запросы
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Методы, которые разрешены
        credentials: true // Разрешить передачу куки
    });
    const swagger = new DocumentBuilder()
        .setTitle("My Application")
        .setDescription("API documentation for my application")
        .setVersion("1.0")
        .addTag("users") // Добавьте теги для разных разделов вашей API
        .build();

    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup("", app, document);

    await app.listen(config.PORT);
    console.log(`Application is running on: http://localhost:${config.PORT}`);
}
bootstrap();
