import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.game.env', isGlobal: true }),
    MongooseModule.forRootAsync(getMongoConfig()),
    RMQModule.forRootAsync(getRMQConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
