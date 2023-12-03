const { readRowsFromFile } = require("../utils");

const getNumbers = (row) => { return row.match(/\d+/g); }

const createMatrix = (rows) => {
    const matrix = [];

    let i;
    for(i=0; i<rows.length; i++) {        
        const row = rows[i];
        const numbers = getNumbers(row);

        matrix[i] = [];

        let lastIndex = -1, k;
        for(k=0; k<numbers.length; k++) {            
            lastIndex = row.indexOf(numbers[k], lastIndex);
            for(let j=lastIndex; j<lastIndex+numbers[k].length; j++) {
                matrix[i][j] = Number(numbers[k]);
            }
            lastIndex += numbers[k].length;
        }
    }

    return matrix;
}

const multiply = (nums) => { return nums[0] * nums[1]; }

const addToNums = (matrix, nums, i, j) => {
    if(matrix[i] && matrix[i][j] && (nums.length == 0 || nums[0] != matrix[i][j])) {
        nums.push(matrix[i][j]);
    }    
}

const run = () => {
    const rows = readRowsFromFile(__dirname + '/data');
    
    const indizes = [[0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]];
    const matrix = createMatrix(rows);

    let sum = 0, i;
  
    for(i=0; i<rows.length; i++) {
       
        let index = -1;
        while(true) {
            let nums = [];        
            index = rows[i].indexOf("*", index+1);

            if(index == -1) break;

            for(let j=0; j<indizes.length; j++) {
                addToNums(matrix, nums, i+indizes[j][0], index+indizes[j][1]);
                if(nums.length == 2) { sum += multiply(nums); break; }
            }
        }
    }

    return sum;
}

module.exports = run;