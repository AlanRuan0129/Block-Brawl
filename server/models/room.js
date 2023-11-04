import { player } from "./player.js";
import { board } from "./board.js";

export class room {

    constructor(roomId, host) {
        this.roomId = roomId;
        this.hostId = host.id;
        this.board = null;
        this.isOpen = true;
        this.players = new Map();
        this.players.set(host.id, host);
    }

    addPlayer(player) {
        this.players.set(player.id, player);
    }


    toDto() {
        let players = [];
        this.players.forEach((player, playerId) => {
            players.push({
                ...player.toDto(),
            });
        });
    
        if (this.isOpen) {
            return {
              roomId: this.roomId,
              hostId: this.hostId,
              board: this.board ? this.board.toDto() : null,
              players: players,
            };
          } else {
            return {
              roomId: this.roomId,
              hostId: this.hostId,
              board: this.board ? this.board.toDto() : null,
              players: players,
            };
          }
    
    
    }
    

}