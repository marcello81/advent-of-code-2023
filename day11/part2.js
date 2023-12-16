const { readRowsFromFile } = require("../utils");

const run = () => {
    let matrix = readRowsFromFile(__dirname + "/data").map(r => r.split(""));

    const emptyRows = getEmptyRows(matrix);
    const emptyCols = getEmptyCols(matrix);

    const galaxies = [];
    matrix.forEach((row, y) => row.forEach((pos, x) => { if(matrix[y][x] === "#") galaxies.push([y, x]); }));

    let sum = 0;
    for(let i=0; i<galaxies.length; i++) {
        for(let j=i+1; j<galaxies.length; j++) {
            sum += calculateDistance(galaxies, i, j, emptyRows, emptyCols);
        }
    }
    
    return sum;
}

const calculateDistance = (galaxies, i, j, emptyRows, emptyCols) => {
    const galaxyA = galaxies[i];
    const galaxyB = galaxies[j];

    const distance = Math.abs(galaxyA[0] - galaxyB[0]) + Math.abs(galaxyA[1] - galaxyB[1]);

    let crossings = 0;
    
    // check empty row crossings
    for(let m = 0; m<emptyRows.length; m++) {    
        if(galaxyA[0] > galaxyB[0]) {      
            if(emptyRows[m]>galaxyB[0] && emptyRows[m]<galaxyA[0]) crossings++;
        } else {
            if(emptyRows[m]>galaxyA[0] && emptyRows[m]<galaxyB[0]) crossings++;
        }
    }

    // check empty col crossings    
    for(let m = 0; m<emptyCols.length; m++) {
        if(galaxyA[1] > galaxyB[1]) {        
            if(emptyCols[m]>galaxyB[1] && emptyCols[m]<galaxyA[1]) crossings++;
        } else {
            if(emptyCols[m]>galaxyA[1] && emptyCols[m]<galaxyB[1]) crossings++;
        }
    }
    
    const result = distance + (crossings * 999999);
    
    return result;
}

const getEmptyRows = (matrix) => {
    const emptyRows = [];
    for(let i=0; i<matrix.length; i++) {
        if(matrix[i].every(c => c === ".")) {
            emptyRows.push(i);
        }
    }
    return emptyRows;
}

const getEmptyCols = (matrix) => {
    const emptyCols = [];
    for(let y=0; y<matrix[0].length; y++) {
        let empty = true;
        for(let x=0; x<matrix.length; x++) {
            if(matrix[x][y] !== ".") {
                empty = false;
                break;
            }
        }
        if(empty) emptyCols.push(y);
    }
    return emptyCols;
}

module.exports = run;