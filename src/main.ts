import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';

const IS_PROD = process.env.NODE_ENV === 'production';
const SWAGGER_PATH = 'swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (!IS_PROD) {
    const options = new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setDescription(process.env.npm_package_description)
      .setVersion(process.env.npm_package_version)
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      ignoreGlobalPrefix: false,
    });

    SwaggerModule.setup(SWAGGER_PATH, app, document);
    Logger.log(
      `Swagger doc setup http://127.0.0.1:${process.env.PORT}/${SWAGGER_PATH}`,
      'NestApplication',
    );
  }
  // 参数校验
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  console.info(`server running on port ${process.env.PORT}`);
  await app.listen(process.env.PORT);
}

bootstrap();
