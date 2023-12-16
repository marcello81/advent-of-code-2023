const { readRowsFromFile } = require("../utils");

const DATA = "data";

const run = () => {        
    let rows = readRowsFromFile(__dirname + '/' + DATA);
    let matrix = rows.map(r => r.split(""));

    for(let x=0; x<matrix[0].length; x++) {
        for(let y=1; y<matrix.length; y++) {
            if(matrix[y][x] === "O") {
                                
                let index;
                for(let k=y-1; k>=0; k--) {
                    index = k;
                    if(matrix[k][x] === "O" || matrix[k][x] === "#") {
                        index++;
                        break;
                    }                
                }

                matrix[y][x] = ".";
                matrix[index][x] = "O";
            }
        }
    }

    let result = 0;    
    for(let i=0; i<matrix.length; i++) {
        for(let j=0; j<matrix[i].length; j++) {
            if(matrix[i][j] === "O") result += (matrix.length - i);
        }
    }

    return result;
}

module.exports = run;