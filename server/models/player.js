
export class player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
      }

    toDto() {
        return {
          id: this.id,
          name: this.name,
        };
    }

}