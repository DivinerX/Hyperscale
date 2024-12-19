import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  uri: process.env.MONGODB_URI,
}));

export const jwtConfig = registerAs('jwt_secret', () => ({
  secret: process.env.JWT_SECRET,
}));
