import io from "socket.io-client";
 
export default class SocketProvider {

    static socket;

    static getSocket = ()=>{

        if(this.socket) return this.socket
        else {
            this.socket = io("ws://159.89.223.138:3000", {
                'reconnection': true,
						'reconnectionDelay': 50000,
						'reconnectionDelayMax' : 50000,
						'reconnectionAttempts': 3,
						transports: ['websocket']
            });
            return this.socket

        
        }
         

    }

}