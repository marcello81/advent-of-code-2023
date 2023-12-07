const { readRowsFromFile } = require("../utils");

const checkRows = (rows) => {

    let sum = 0;
    
    for(i=0; i<rows.length; i++) {
        const row = rows[i];

        const numbers = row.split(": ")[1];
        const numsSplitted = numbers.split(" | ");

        const winningNums = new Set(numsSplitted[0].split(" "));
        winningNums.forEach(e => { if(e == "") winningNums.delete(e); });

        let count = -1;
        numsSplitted[1].split(" ").forEach(num => {
            if(winningNums.has(num)) count++;
        });

        if(count > -1) {
            sum += Math.pow(2, count);        
        }
    }

    return sum;
}

const run = () => {
    const rows = readRowsFromFile(__dirname + '/data');
    return checkRows(rows);
}

module.exports = run;