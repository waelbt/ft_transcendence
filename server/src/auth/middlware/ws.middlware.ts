import { Socket } from "socket.io";
import { WebSocketAuthGuard } from "../authGuard/webS.jwt.guard";

type SocketIOMIDDELWARE = {
    (client : Socket, next: (err? : Error ) => void);
}

export const SocketIOMIDDELWARE = () : SocketIOMIDDELWARE => {
    return (client, next) => {
        console.log('client : ', client);
        try {
            WebSocketAuthGuard.validate(client);
            next();
        } catch (error){
            console.log('error is : ', error);
            next (error);
        }
    }
}
