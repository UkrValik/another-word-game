import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { GameModule } from './game/game.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { getJWTConfig } from './configs/jwt.config';
import { getMongoConfig } from './configs/mongo.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    VocabularyModule,
    GameModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(getMongoConfig()),
    JwtModule.registerAsync(getJWTConfig()),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
