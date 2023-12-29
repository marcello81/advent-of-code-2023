import fs from "fs";
import { EOL } from "os";

const DATA = "data";
const FILENAME = __dirname + '/' + DATA;
const STEPS = 64;

const run = () => {
    const rows = parseInput();
    const start = getStartPosition(rows).join(",");

    const q: string[][] = [];
    q[0] = [start];    
    
    for(let step=0; step<=STEPS-1; step++) {           
        while(q[step].length > 0) {
            const pos = q[step].shift()!.split(",").map(e => Number(e));
            const sign = rows[pos[0]][pos[1]];

            for(let dir of [[-1,0], [1,0], [0,-1], [0, 1]]) {
                const nr = pos[0] + dir[0];
                const nc = pos[1] + dir[1];

                if(nr < 0 || nc < 0 || nr >= rows.length || nc >= rows[0].length) continue;
                if(rows[nr][nc] === "#") continue;
                
                if(q[step+1] === undefined) q[step+1] = [];
                const npos = [nr, nc].join(",");
                if(q[step+1].includes(npos) === false) q[step+1].push(npos);
            }
        }
    }

    console.log(new Set(q[STEPS]).size);
}

const parseInput = (): string[] => fs.readFileSync(FILENAME, "utf-8").split(EOL);

const getStartPosition = (rows: string[]): number[] => {
    for(let r=0; r<rows.length; r++) {
        for(let c=0; c<rows[r].length; c++) {
            if(rows[r][c] === "S") return [r, c];
        }        
    }
    throw Error("could not find starting point.");
}

run();

