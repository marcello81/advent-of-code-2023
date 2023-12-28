import fs from "fs";
import { EOL } from "os";

const DATA = "data";
const FILENAME = __dirname + '/' + DATA;

const run = () => {        
    let grid: string[] = fs.readFileSync(FILENAME, "utf-8").split(EOL);
    
    let stringified = stringify(grid);
    const seen = new Set<string>();
    seen.add(stringified);    
    const array:string[] = [];
    array.push(stringified);
    
    let i = 0;
    while(true) {
        i++;

        grid = cycle(grid);
        stringified = stringify(grid);

        if(seen.has(stringified)) break;
        seen.add(stringified);
        array.push(stringified);
    }

    const first = array.indexOf(stringified);

    const resultGrid = destringify(array[(1000000000 - first) % (i - first) + first]);

    console.log(calculateResult(resultGrid));
}

const stringify = (grid: string[]): string => {
    return grid.reduce((total, el, i) => total + (i>0 ? ";": "") + el);
}

const destringify = (str: string): string[] => {
    return str.split(";");
}

const cycle = (grid: string[]): string[] => {
    for(const i of [1,2,3,4]) {
        grid = transpose(grid);
        grid = tiltLeft(grid);
        grid = invertRows(grid);
    }
    return grid;
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

const invertRows = (grid: string[]): string[] => {
    return grid.map(row => row.split("").reverse().join(""));
}

const transpose = (grid: string[]): string[] => {
    return grid[0].split("").map((x,i) => grid.map(x => x[i]).join(""));
}

const tiltLeft = (grid: string[]): string[] => {
    return grid.map(row => row.split("#").map(group => group.split("").sort().reverse().join("")).join("#"));
}

run();