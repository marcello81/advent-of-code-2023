import fs from "fs";
import { EOL } from "os";
import { Tile } from "./models/Tile";
import { QueueEntry } from "./models/QueueEntry";

const DATA: string = "data2";
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

    const points:number[][]= [start];
    for(let i=0; i<tiles.length; i++) {
        for(let j=0; j<tiles[0].length; j++) {
            const tile = tiles[i][j];
            if(tile.type === "#") continue;

            let neighbor:number = 0;
            if(i-1 > 0 && tiles[i-1][j].type !== "#") neighbor++;
            if(i+1 < tiles.length-1 && tiles[i+1][j].type !== "#") neighbor++;
            if(j-1 > 0 && tiles[i][j-1].type !== "#") neighbor++;
            if(j+1 < tiles[0].length-1 && tiles[i][j+1].type !== "#") neighbor++;

            if(neighbor >= 3) {
                points.push([i, j]);
            }
        }
    }

    points.push(end);

    let longest: number = 0;

    queue.push(new QueueEntry(tiles[start[0]][start[1]], start, "1,0", 0, new Set(start.join(","))));
    seen.add(start.join(","));

    while(queue.length > 0) {
        const entry: QueueEntry = queue.shift()!;
        
        if(points.some(p => p[0] === entry.coord[0] && p[1] === entry.coord[1])) {
                        
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
            if(tile.type === "<" && !(dir[0] === 0 && dir[1] === -1)) continue;
            if(tile.type === ">" && !(dir[0] === 0 && dir[1] === 1)) continue;
            if(tile.type === "^" && !(dir[0] === -1 && dir[1] === 0)) continue;
            if(tile.type === "v" && !(dir[0] === 1 && dir[1] === 0)) continue;

            queue.push(new QueueEntry(tile, [y,x], dir.join(","), entry.count + 1, newSeen));
        }
    }

    console.log(longest);
}

const getDirections = (entry: QueueEntry) => {
    let coords = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    if (entry.tile.type === ">") coords = [[0, 1]];
    else if (entry.tile.type === "<") coords = [[0, -1]];
    else if (entry.tile.type === "v") coords = [[1, 0]];
    else if (entry.tile.type === "^") coords = [[-1, 0]];
    return coords;
}

run();