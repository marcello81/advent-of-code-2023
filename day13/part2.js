const { readRowsFromFile } = require("../utils");

const DATA = "data";

const run = () => {    
    const patterns = readPatterns();  
    
    let sum = 0;
    for(let i=0; i<patterns.length; i++) {
        const pattern = patterns[i];
        
        // check horizontally
        result = checkPattern(pattern);        
        sum += result * 100;

        if(result > 0) continue;
        
        const transposedPattern = transposePattern(pattern);
        
        // check vertically
        result = checkPattern(transposedPattern);
        sum += result;
    }

    return sum;
}

const getDifferenceCount = (line1, line2) => {
    let differences = 0;
    for(let i=0; i<line1.length; i++) {
        if(line1[i] !== line2[i]) differences++;
        if(differences > 1) break;
    }
    return differences;
}

const checkPattern = (pattern) => {
    let result = 0;
    for (let j=0; j<pattern.length-1; j++) {
        let differences = getDifferenceCount(pattern[j], pattern[j+1]);
        if (differences < 2) {                        
            for (let k = 1; k < Math.min(j+1, pattern.length - 1 - j); k++) {
                differences += getDifferenceCount(pattern[j-k], pattern[j+k+1]);
                if(differences > 1) break;
            }

            if (differences === 1) {
                return j+1;
            }
        }
    }

    return result;
}

const readPatterns = () => {
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
    matrix = transposeMatrix(matrix);
    return matrix.map(arr => arr.join(""));
}

const transposeMatrix = matrix => matrix[0].map((x,i) => matrix.map(x => x[i]))

module.exports = run;