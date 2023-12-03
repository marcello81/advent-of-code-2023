const fs = require("fs");
const { EOL } = require("os");

const readRowsFromFile = (filename) => fs.readFileSync(filename, "utf-8").split(EOL);

module.exports = { readRowsFromFile }