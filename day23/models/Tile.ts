export class Tile {
    type: string; 

    constructor(type: string) {
        this.type = type;
    }

    toString = () => {
        return "Tile (type: '" + this.type + "')";
    }
}