import fs from "fs";
import { EOL } from "os";

const DATA = "data";
const FILENAME = __dirname + '/' + DATA;
        
const run = () => {    
    const grid = fs.readFileSync(FILENAME, "utf-8").split(EOL).map(row => row.split(""));
    const seen = new Set<string>();
    const queue: number[][] = [[0, -1, 0, 1]];
 
    while(queue.length > 0) {
        let [y, x, dy, dx] = queue.shift()!;
    
        y += dy;
        x += dx;

        if(y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) continue;

        const tile = grid[y][x];

        if(tile === "." || (tile === "-" && dx != 0) || (tile === "|" && dy != 0)) {
            addToLists(seen, queue, y, x, dy, dx);
        } else if(tile === "/") {
            addToLists(seen, queue, y, x, -dx, -dy);
        } else if(tile === "\\") {
            addToLists(seen, queue, y, x, dx, dy);
        } else {
            const dirs = tile === "|" ? [[1,0], [-1,0]] : [[0,1], [0,-1]];
            for([dy, dx] of dirs) {
                addToLists(seen, queue, y, x, dy, dx);
            }   
        }
    }       

    const resultSet = new Set<string>();
    seen.forEach(s => { const arr = s.split(","); resultSet.add([arr[0], arr[1]].join(",")) });
    console.log(resultSet.size);
}

const addToLists = (seen: Set<string>, queue: number[][], y: number, x: number, dy: number, dx: number) => {
    if (!seen.has([y, x, dy, dx].join(","))) {
        queue.push([y, x, dy, dx]);
        seen.add([y, x, dy, dx].join(","));
    }
}

run();