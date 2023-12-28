import fs from "fs";
import { EOL } from "os";

const DATA: string = "data";

const parseInput = (): [] => {
    const [] = fs.readFileSync(__dirname + '/' + DATA, "utf-8").split(EOL+EOL);  
    
    return [];
}

const run = () => {
    const [] : [] = parseInput();


        
    console.log(0);
}

run();