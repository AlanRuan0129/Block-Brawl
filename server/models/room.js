import { Board } from "./Board.js";
import { Player } from "./Player.js";
export class Room {
   
    constructor(roomId, host) {
        this.roomId = roomId;
        this.hostId = host.id;
        this.board = null;
        this.isOpen = true;
        this.players = new Map();
        this.players.set(host.id, host);

        this.config = {
          roomSize: 3,
          boardSize: 9,
          roundTime: 60,
          breakTime: 0.0,
          breakerName: host.name,
        };
    }

    addPlayer(player) {
        this.players.set(player.id, player);
    }

    getPlayer(id) {
      return this.players.get(id);
    }


    toDto() {
        let players = [];
        
    
        if (this.isOpen) {
            return {
              roomId: this.roomId,
              hostId: this.hostId,
              players: players,
            };
          } else {
            return {
              roomId: this.roomId,
              hostId: this.hostId,
              players: players,
            };
          }
    
    
    }
    

}