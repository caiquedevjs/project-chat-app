import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway()
export class ChatGateway  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
  @WebSocketServer()  server : Server
  private logger : Logger = new Logger('ChatGateway')

  afterInit(server: Server) {
   this.logger.log('Servidor iniciado!')
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log( `Cliente com o id ${client.id} conectado!`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente com id ${client.id} descontecado`)
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: {content: string}): void{
   this.logger.log(`Mensagem recebida: ${payload.content}`)
   this.server.emit(`Mensagem:`, payload)
  }
}
