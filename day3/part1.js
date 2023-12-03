const { readRowsFromFile } = require("../utils");

const checkRow = (rows, i) => {
    const row = rows[i];            
    const matches = row.match(/\d+/g);
    
    let j, sum = start = end = 0;
    for(j=0; j<matches.length; j++) {
        start = row.indexOf(matches[j], end);
        end = start + matches[j].length-1;
        
        if(hasAdjacentSymbol(rows, i, start, end)) {            
            sum += Number(matches[j]);
        }
    }

    return sum;
}

const hasAdjacentSymbol = (rows, i, start, end) => {
    const row = rows[i];
    const startChecked = start>0 ? start-1 : start;
    const endChecked = end<row.length-1 ? end+1 : end;

    if(i > 0 && checkForSymbol(rows[i-1], startChecked, endChecked)) return true;
    if(i<rows.length-1 && checkForSymbol(rows[i+1], startChecked, endChecked)) return true;
    if(isSymbol(row[startChecked]) || isSymbol(row[endChecked])) return true;

    return false;
}

const checkForSymbol = (row, start, end) => {
    let j;
    for(j=start; j<=end; j++) {
        if(isSymbol(row[j])) return true;
    }
    return false;
}

const isSymbol = (symbol) => { return (isNumber(symbol) || isDot(symbol)) === false; }
const isNumber = (num) => { return num == Number(num); }
const isDot = (dot) => { return dot === "."; }

const run = () => {
    const rows = readRowsFromFile(__dirname + '/data');
    
    let sum = 0, i;
    for(i=0; i<rows.length; i++) {
        sum += checkRow(rows, i);
    }

    return sum;
}

module.exports = run;