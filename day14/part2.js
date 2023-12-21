const { readRowsFromFile } = require("../utils");

const DATA = "data2";

const run = () => {     
    let matrix = readRowsFromFile(__dirname + '/' + DATA).map(r => r.split(""));

    matrix = transpose(matrix);
    
    const seen = new Set();
    seen.add(matrix);
    const array = [];
    array.push(matrix);

    let i = 0;
    while(true) {
        i++;
        matrix = cycle(matrix);

        if(seen.has(matrix)) break;

        seen.add(matrix);
        array.push(matrix);
    }

    const first = array.indexOf(matrix);
    matrix = array[(1000000000 - first) % (i - first) + first];
    
    matrix = transpose(matrix);
    let result = calculateResult(matrix);

    return result;
}

const cycle = (matrix) => {    
    matrix = tiltLeft(matrix);  // NORTH

    matrix = rotateLeft(matrix);
    matrix = tiltLeft(matrix);  // WEST

    matrix = rotateLeft(matrix);
    matrix = tiltLeft(matrix);  // SOUTH

    matrix = rotateLeft(matrix);
    matrix = tiltLeft(matrix);  // EAST

    return matrix;
}

const rotateLeft = (matrix) => matrix[0].map((val, index) => matrix.map(row => row[row.length-1-index]))
const tiltLeft = (matrix) => matrix.map(arr => arr.join("").split("#").map(arr => arr.split("").sort().reverse().join("")).join("#").split(""))

const calculateResult = (matrix) => {
    let result = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "O") result += (matrix.length - i);
        }
    }
    return result;
}

const transpose = matrix => matrix[0].map((x,i) => matrix.map(x => x[i]))

module.exports = run;