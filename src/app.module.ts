import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "./users/users.module";
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://localhost/notice'), RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
