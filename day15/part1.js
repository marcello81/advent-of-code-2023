const fs = require("fs");

const DATA = "data";

const run = () => {
    const steps = fs.readFileSync(__dirname + '/' + DATA, "utf-8").split(",");

    let result = 0;

    for(let i=0; i<steps.length; i++) {
        result += getResultPerStep(steps[i]);
    }
   
    return result;
}

const getResultPerStep = (step) => {
    let currentResult = 0;
    for(let j=0; j<step.length; j++) {
        // Determine the ASCII code for the current character of the string.
        const ascii = step.charCodeAt(j);

        // Increase the current value by the ASCII code you just determined.
        currentResult += ascii;

        // Set the current value to itself multiplied by 17.
        currentResult *= 17;

        // Set the current value to the remainder of dividing itself by 256.   
        currentResult %= 256;
    }
    return currentResult;
}

module.exports = run;