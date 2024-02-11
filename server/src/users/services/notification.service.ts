import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';


@Injectable()
export class notificationService {
    private socketsMap: Map<string, Socket[]> = new Map();

    addSocket(id: string, socket: Socket): void {
      const sockets = this.socketsMap.get(id) || [];
      sockets.push(socket);
      this.socketsMap.set(id, sockets);
    }

    removeSocket(id: string, socket: Socket): boolean {
		const sockets = this.socketsMap.get(id);
		if (sockets) {
			const index = sockets.indexOf(socket);
			if (index !== -1) {
				sockets.splice(index, 1);
				if (sockets.length === 0) {
				    this.socketsMap.delete(id);
				}
				return true;
			}
		}
		return false;
    }

    emitToClient(clientId: string, event: string, data: any): boolean {

		const sockets = this.socketsMap.get(clientId);
		if (sockets) {
			sockets.forEach(socket => {
				socket.emit(event, data);
		});
			return true;
		}
		return false;
    }
}