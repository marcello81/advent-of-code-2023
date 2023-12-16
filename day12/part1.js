const { readRowsFromFile } = require("../utils");

const run = () => {
    const rows = readRowsFromFile(__dirname + '/data2');

    console.log(rows);

    return 0;
}


module.exports = run;