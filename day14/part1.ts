import fs from "fs";
import { EOL } from "os";

const DATA = "data2";
const FILENAME = __dirname + '/' + DATA;

const run = () => {        
    let grid: string[] = fs.readFileSync(FILENAME, "utf-8").split(EOL);
    
    grid = transpose(grid);
    grid = tiltLeft(grid);
    grid = transpose(grid);
    
    console.log(calculateResult(grid));
}

const calculateResult = (grid:string[]) => {
    let result = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "O") result += (grid.length - i);
        }
    }
    return result;
}


const transpose = (grid: string[]): string[] => {
    return grid[0].split("").map((x,i) => grid.map(x => x[i]).join(""));
}

const tiltLeft = (grid: string[]): string[] => {
    return grid.map(row => row.split("#").map(group=> group.split("").sort().reverse().join("")).join("#"));
}

run();