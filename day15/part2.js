const fs = require("fs");

const DATA = "data";

const run = () => {
    const steps = fs.readFileSync(__dirname + '/' + DATA, "utf-8").split(",");

    const boxes = [];

    for(let i=0; i<steps.length; i++) {
        let labelAndLength = [];
        labelAndLength = steps[i].indexOf("=") > 0 ? steps[i].split("=") : steps[i].split("-");
        
        const hash = calculateHash(labelAndLength[0]);

        if(boxes[hash]) {      
            let replaced = false;     
            for(let j=0; j<boxes[hash].length; j++) {
                if(boxes[hash][j][0] === labelAndLength[0]) {
                    if(labelAndLength[1]) {
                        boxes[hash][j][1] = labelAndLength[1];
                    } else {
                        boxes[hash].splice(j, 1);
                    }
                    replaced = true;
                    break;
                }
            }

            if(replaced === false && labelAndLength[1]) {
                boxes[hash].push([labelAndLength[0], labelAndLength[1]]);
            }
        } else if(labelAndLength[1]) {
            boxes[hash] = [];
            boxes[hash].push([labelAndLength[0], labelAndLength[1]]);
        }
    }

    let result = 0;

    for(let i=0; i<boxes.length; i++) {
        if(boxes[i]) {
            for(let j=0; j<boxes[i].length; j++) {
                result += (i+1) * (j+1) * Number(boxes[i][j][1]);
            }
        }
    }
    
    return result;
}

const calculateHash = (step) => {
    let currentResult = 0;
    for(let j=0; j<step.length; j++) {
        const ascii = step.charCodeAt(j);
        currentResult += ascii;
        currentResult *= 17;
        currentResult %= 256;
    }
    return currentResult;
}

module.exports = run;