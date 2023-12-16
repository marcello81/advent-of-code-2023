const { readRowsFromFile } = require("../utils");

const run = () => {
    let matrix = readRowsFromFile(__dirname + "/data").map(r => r.split(""));

    doubleTheEmptyRows(matrix);
    matrix = transpose(matrix);
    doubleTheEmptyRows(matrix);
    matrix = transpose(matrix);

    const galaxies = [];
    matrix.forEach((row, i) => row.forEach((pos, j) => { if(matrix[i][j] === "#") galaxies.push([i, j]); }));
    
    let sum = 0;
    for(let i=0; i<galaxies.length; i++) {
        for(let j=i+1; j<galaxies.length; j++) {
            sum += calculateDistance(galaxies[i], galaxies[j]);
        }
    }
    
    return sum;
}

const calculateDistance = (galaxyA, galaxyB) => {
    return Math.abs(galaxyA[0] - galaxyB[0]) + Math.abs(galaxyA[1] - galaxyB[1]);
}

const doubleTheEmptyRows = (matrix) => {
    for(let i=0; i<matrix.length; i++) {
        if(matrix[i].every(c => c === ".")) {
            matrix.splice(i+1, 0, matrix[i]);
            i++;
        }
    }
}

const transpose = matrix => matrix[0].map((x,i) => matrix.map(x => x[i]))

module.exports = run;