const { readRowsFromFile } = require("../utils");

const DATA = "data";

const run = () => {    
    const patterns = getPatterns();  
    
    console.log("patterns: ");
    console.log(patterns);

    let sum = 0;
    for(let i=0; i<patterns.length; i++) {

        const pattern = patterns[i];

        console.log("\npattern: ");
        console.log(pattern);
        
        // checkHorizontal
        result = checkPattern(pattern);        
        sum += result * 100;

        if(result > 0) continue;
        
        const transposedPattern = transposePattern(pattern);
        
        console.log("\ntransposed pattern: ");
        console.log(transposedPattern);
        
        result = checkPattern(transposedPattern);
        sum += result;
    }

    console.log("sum: " + sum);

    return sum;
}

const getPatterns = () => {
    const rows = readRowsFromFile(__dirname + '/' + DATA);

    const patterns = [];
    patterns[0] = [];
    let j = 0;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i] === "") {
            patterns[++j] = [];
            continue;
        }
        patterns[j].push(rows[i]);
    }

    return patterns;
}

const transposePattern = (pattern) => {
    let matrix = pattern.map(r => r.split(""));
    matrix = transpose(matrix);
    return matrix.map(arr => arr.join(""));
};

const transpose = matrix => matrix[0].map((x,i) => matrix.map(x => x[i]))

module.exports = run;

const checkPattern = (pattern) => {
    let result = 0;
    for (let j=0; j < pattern.length-1; j++) {
        if (pattern[j] === pattern[j+1]) {
            console.log("mirror between " + j + " and " + (j+1) + " ?");
            let isMirror = true;
            for (let k = 1; k < Math.min(j+1, pattern.length - 1 - j); k++) {
                console.log(" - comparing " + (j-k) + " and " + (j+k+1));
                console.log(" - which is : [" + pattern[j-k] + "] and [" + pattern[j+k+1] + "]");
                if (pattern[j-k] !== pattern[j+k+1]) {
                    isMirror = false;
                    break;
                }
            }
            if (isMirror) {
                console.log(" - YES !!! result: " + (j+1));
                return j+1;
            }
        }
    }
    return result;
}
