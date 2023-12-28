import { Tile } from "./Tile";

export class QueueEntry {
    tile: Tile;
    coord: number[];
    dir: string;
    count: number;
    seen: Set<string>;

    constructor(tile: Tile, coord: number[], dir: string, count: number, seen: Set<string>) {
        this.tile = tile;
        this.coord = coord;
        this.dir = dir;
        this.count = count;
        this.seen = seen;
    }

    toString = () => {
        return "QueueEntry (" + this.tile.toString() + ", coord: " + this.coord + ", dir: [" + this.dir + "], count: "+ this.count + ")";
    }
}