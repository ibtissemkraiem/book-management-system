import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    })
  app.useGlobalFilters(new ValidationExceptionFilter());


  const config = new DocumentBuilder()
    .setTitle('Book Management API')
    .setDescription('API documentation for the book management system')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3010);
}
bootstrap();
