import fs from "fs";
import { EOL } from "os";
import { Tile } from "./models/Tile";
import { QueueEntry } from "./models/QueueEntry";

const DATA: string = "data";
const filename = __dirname + '/' + DATA;

const queue: QueueEntry[] = [];
const seen = new Set();

const parseInput = (): Tile[][] => {
    const lines = fs.readFileSync(filename, "utf-8").split(EOL);
    return lines.map(l => l.split("").map(t => new Tile(t)));
}

const run = () => {
    const tiles: Tile[][] = parseInput();

    const start = [0,1];
    const end = [tiles.length-1,tiles[0].length-2];

    queue.push(new QueueEntry(tiles[start[0]][start[1]], start, "1,0", 0, new Set(start.join(","))));
    seen.add(start.join(","));

    let longest: number = 0;

    while(queue.length > 0) {
        const entry: QueueEntry = queue.shift()!;
        
        if(entry.coord[0] === end[0] && entry.coord[1] === end[1]) {
            longest = Math.max(longest, entry.count);
            continue;
        }

        let directions = getDirections(entry);

        for(const dir of directions) {
            const y = entry.coord[0] + dir[0];
            const x = entry.coord[1] + dir[1];

            if(y < 0 || y >= tiles.length || x < 0 || x >= tiles[0].length) continue;
            
            const key = [y,x].join(",");
            if(entry.seen.has(key)) continue;
            const newSeen = new Set(entry.seen);
            newSeen.add(key);
            
            const tile = tiles[y][x];

            if(tile.type === "#") continue;

            queue.push(new QueueEntry(tile, [y,x], dir.join(","), entry.count + 1, newSeen));
        }
    }

    console.log(longest);
}

const getDirections = (entry: QueueEntry) => {
    let coords = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    return coords;
}

run();