import fs from "fs";
import { EOL } from "os";
import { PQueue } from "./models/PQueue";
import { QueueEntry } from "./models/QueueEntry";

const DATA: string = "data";

const parseInput = (): number[][] => {
    return fs.readFileSync(__dirname + '/' + DATA, "utf-8").split(EOL).map(r => r.split("").map(n => Number(n))); 
}

const run = () => {
    const grid: number[][] = parseInput();

    const seen = new Set();

    // hl = heatlost, r = row, c = column, dr = directionRow, dc = directionColumn, n = times    
    const pq = new PQueue<QueueEntry>((a: QueueEntry, b: QueueEntry) => a.hl < b.hl);    
    pq.enqueue({hl: 0, r: 0, c: 0, dr: 0, dc: 0, n: 0});
    
    while(pq.isEmpty() === false) {
        const entry = pq.dequeue();
        const { hl, r, c, dr, dc, n } = entry!;
        console.log(entry);
        
        if(r === grid.length - 1 && c === grid[0].length - 1) {
            console.log(hl);
            break;    // end coordinates
        }

        if(seen.has([r,c,dr,dc,n].join(","))) continue; // no heatlost to prevent a loop
        seen.add([r,c,dr,dc,n].join(","));

        if(n < 3 && !(dr === 0 && dc === 0)) {
            const nr = r + dr; // new row
            const nc = c + dc; // new column

            addToQueue(grid, pq, hl, nr, nc, dr, dc, n+1);
        }

        for(let [ndr, ndc] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {                
            if((ndr !== dr || ndc !== dc) && (ndr !== -dr || ndc !== -dc)) {
                const nr = r + ndr;
                const nc = c + ndc;

                addToQueue(grid, pq, hl, nr, nc, ndr, ndc, 1);
            }
        }
    }
}

const isInGrid = (grid: number[][], row: number, column: number): boolean => {
    return row >= 0 && row < grid.length && column >= 0 && column < grid[0].length;
}

const addToQueue = (grid: number[][], pq: PQueue<QueueEntry>, 
                    hl: number, r: number, c: number, dr: number, dc: number, n: number) => {
    if (isInGrid(grid, r, c)) {
        pq.enqueue({ hl: hl + grid[r][c], r: r, c: c, dr: dr, dc: dc, n: n });
        // console.log("added: (" + (hl + grid[nr][nc]) + ", " + nr + ", " + nc + ", " + ndr + ", " + ndc + ", " + 1 + ")");
    }
    
    //pq.toString();
}

run();

