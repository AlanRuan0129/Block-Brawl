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
    host.isBreaker = true;

    this.config = {
      roomSize: 3,
      level: 1,
      roundTime: 60,
      breakTime: 0.0,
      breakerName: host.name,
    };

    this.colors = [
      "#e0d1af",
      "#81a9db",
      "#ffd11a",
      "#f19cb7",
      "#f3f3f3",
      "#646464",
      "#c3a035",
    ];

    this.colorStatus = [null, null, null, null, null, null, null, null, null];
  }

  initBoard(level) {
    this.board = new Board(level);
  }

  addPlayer(player) {
    this.players.set(player.id, player);
  }

  getPlayer(id) {
    return this.players.get(id);
  }

  initPlayerPosition() {
    let i = 0;
    this.players.forEach((player, id) => {
      if (player.isBreaker) {
        player.x = 1;
        player.y = 1;
      } else {
        player.x = 5;
        player.y = 5 + 2 * i;
        i++;
      }
    });
  }

  initTimer(onFinished, onTimerProceeded) {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.config) {
      this.currentGameTime = this.config.roundTime;
    }
    const countDown = () => {
      onTimerProceeded(this.currentGameTime);
      this.currentGameTime--;
      if (this.currentGameTime < 0) {
        clearInterval(this.timer);
        onFinished();
      }
    };
    this.timer = setInterval(countDown, 1000);
  }

  closeGame() {
    this.isOpen = true;
    if (this.timer) {
      // ensure the previous timer is cleared before creating a new one
      clearInterval(this.timer);
    }
    if (this.board) {
      this.board = null;
    }
  }

  clearTimer() {
    clearInterval(this.timer);
  }

  // Checks if non-breaker players are colliding with the breaker or are in unsafe positions
  checkPlayerAlive(playerId) {
    const player = this.getPlayer(playerId);
    const host = this.getPlayer(this.hostId); // host is the breaker

    if (player && player.isAlive && !player.isBreaker) {
      if (
        !this.board.check(player.x, player.y) ||
        (player.x === host.x && player.y === host.y)
      ) {
        player.isAlive = false;
        return false;
      }
    }

    // Check all other non-breaker players for collision with the breaker
    this.players.forEach((otherPlayer) => {
      if (
        otherPlayer.id !== playerId &&
        otherPlayer.isAlive &&
        !otherPlayer.isBreaker
      ) {
        if (otherPlayer.x === host.x && otherPlayer.y === host.y) {
          otherPlayer.isAlive = false;
        }
      }
    });

    return true; // Player remains alive if no collision or unsafe position
  }

  checkIsAllPlayerDead() {
    const playersList = Array.from(this.players.values());
    let deadCount = playersList.filter((p) => !p.isAlive).length;
    if (deadCount == playersList.length - 1) {
      this.currentGameTime = 0;
    }
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
        players: players,
        board: this.board ? this.board.toDto() : null,
        config: this.config,
        colors: this.colors,
        colorStatus: this.colorStatus,
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
