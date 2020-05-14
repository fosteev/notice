import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {CreateMessageDto} from "./dto/create-message.dto";
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    users: number = 0;

    async handleConnection(){
        // A client has connected
        this.users++;

        console.log(this.users);

        // Notify connected clients of current users
        this.server.emit('users', this.users);

    }

    async handleDisconnect(){

        // A client has disconnected
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }

    @SubscribeMessage('msgToClient')
    handleMessage(createMessageDto: CreateMessageDto): void {
        this.server.emit(createMessageDto.room, JSON.stringify({
            ...createMessageDto,
            date: Date.now()
        }));
    }
}
