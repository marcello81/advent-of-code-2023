import fs from "fs";
import { EOL } from "os";
import { Hailstone } from "./models/Hailstone";

const DATA: string = "data2";
const filename = __dirname + '/' + DATA;

const LIMITS: number[] = [200000000000000, 400000000000000];

const parseInput = (): Hailstone[] => {
    const lines = fs.readFileSync(filename, "utf-8").split(EOL);
    return lines.map(r => new Hailstone(...r.replace('@', ',').split(',').map(Number)));
}

const run = () => {
    const hailstones: Hailstone[] = parseInput();

    let total = 0;

    for(let i=0; i<hailstones.length; i++) { 
        const hs1 = hailstones[i];
        for(let j=0; j<i; j++) {
            const hs2 = hailstones[j];

            const [a1, b1, c1] = [hs1.a, hs1.b, hs1.c];
            const [a2, b2, c2] = [hs2.a, hs2.b, hs2.c];
            
            if(a1 * b2 == b1 * a2) continue;
            
            const x = (c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1);
            const y = (c2 * a1 - c1 * a2) / (a1 * b2 - a2 * b1);

            if (LIMITS[0] <= x && x <= LIMITS[1] && LIMITS[0] <= y && y <= LIMITS[1]) {
                if ((x - hs1.sx) * hs1.vx >= 0 && (y - hs1.sy) * hs1.vy >= 0
                && (x - hs2.sx) * hs2.vx >= 0 && (y - hs2.sy) * hs2.vy >= 0) {
                    total++;
                }
            }

        }
    }

    console.log(total);
}

run();