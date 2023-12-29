import fs from "fs";
import { EOL } from "os";

const DATA = "data";
const FILENAME = __dirname + '/' + DATA;

const run = () => {
    
    console.log(0);
}

const parseInput = () => {
    const modulesStr = fs.readFileSync(FILENAME, "utf-8").split(EOL); 
       
    return "";
}


run();