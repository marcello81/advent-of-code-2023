const { readRowsFromFile } = require("../utils");

const DATA = "data2";

const run = () => {        
    let matrix = readRowsFromFile(__dirname + '/' + DATA).map(row => row.split(""));

    matrix = transpose(matrix);
    matrix = tiltLeft(matrix);
    matrix = transpose(matrix);
    
    return calculateResult(matrix);
}

const calculateResult = (matrix) => {
    let result = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "O") result += (matrix.length - i);
        }
    }
    return result;
}

const tiltLeft = matrix => matrix.map(arr => arr.join("").split("#").map(arr => arr.split("").sort().reverse().join("")).join("#").split(""))
const transpose = matrix => matrix[0].map((x,i) => matrix.map(x => x[i]))

module.exports = run;