import { readFileSync } from 'fs';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function getSecsSinceDeploy() {
  const current = new Date().getTime() / 1000;
  const start = parseInt(readFileSync('/project/start-time.txt', 'utf8').trim());
  const result = current - start;
  console.log({ current, start, result });

  return result;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

console.log('tilt time - [' + getSecsSinceDeploy() + ']');

bootstrap();
