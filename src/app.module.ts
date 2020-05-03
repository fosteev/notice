import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from "./users/users.module";
import {MongooseModule} from '@nestjs/mongoose';
import {RoomsModule} from './rooms/rooms.module';
import {MessageModule} from './message/message.module';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forRoot('mongodb://localhost/notice'),
        RoomsModule,
        MessageModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
