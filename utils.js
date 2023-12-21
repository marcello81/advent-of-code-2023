import fs from "fs";
import { EOL } from "os";

const readRowsFromFile = (filename) => fs.readFileSync(filename, "utf-8").split(EOL);

module.exports = { readRowsFromFile }