const { readRowsFromFile } = require("../utils");

const NUM_STR = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const findNumber = (row) => {
    let left = right = -1, i;

    for(i=0; i<row.length; i++) {            
        if(row[i] == Number(row[i])) {
            left = row[i];
            break;
        }
    }

    for(i=row.length-1; i>=0; i--) {
        if(row[i] == Number(row[i])) {
            right = row[i];
            break;
        }
    }

    return left > -1 && right > -1 ? Number(left + right) : 0;
}

const run = () => {
    const data = readRowsFromFile(__dirname + '/data');
    let sum = 0;

    data.forEach(el => {
        sum += findNumber(el);
    });

    return sum;
}

module.exports = run;