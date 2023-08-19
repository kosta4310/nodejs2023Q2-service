import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const document = JSON.parse(
    (await readFile(join(process.cwd(), './doc/openapi.json'))).toString(
      'utf-8',
    ),
  );
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
