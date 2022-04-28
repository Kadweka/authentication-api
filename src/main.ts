import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger'

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Expense Management Center')
  .setDescription('This is to help Manager your Funds')
  .setVersion('1.0')
  .addTag('Expense Manager')
  .build();

const document = SwaggerModule.createDocument(
  app,
  config
  );

SwaggerModule.setup('api', app, document);
app.enableCors();
await app.listen(process.env.PORT || 3000);
  // await app.listen(3000);
  if(module.hot){
    module.hot.accept();
    module.hot.dispose(()=>app.close());
  }
}

bootstrap();
