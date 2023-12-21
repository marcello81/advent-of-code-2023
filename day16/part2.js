const fs = require("fs");

const DATA = "data";

const run = () => {
    const steps = fs.readFileSync(__dirname + '/' + DATA, "utf-8").split(",");

    let result = 0;


   
    return result;
}

module.exports = run;