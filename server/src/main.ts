import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    session({
      secret: 'your-secret-key', // Replace with a secure secret from your config
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60 * 24, // 24 hours
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
