import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //cors
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  //swagger
  const config = new DocumentBuilder()
    .setTitle('API de Teste')
    .setDescription('Documentação da API criada com NestJS')
    .setVersion('1.0')
    .addTag('dados')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
