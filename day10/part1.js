const { readRowsFromFile } = require("../utils");

const NORTH = [-1,0];
const SOUTH = [1,0];
const WEST = [0,-1];
const EAST = [0,1];

const run = () => {
    const map = getMap();
    let currPos = getStartCoordinates(map); // [y, x]

    // get first position & move after start
    let lastMove;
    if(getNextMove(NORTH, getSymbolFromMap(map, getNewPosition(currPos, NORTH)))) {
        currPos = getNewPosition(currPos, NORTH);
        lastMove = NORTH;
    } else if(getNextMove(SOUTH, getSymbolFromMap(map, getNewPosition(currPos, SOUTH)))) {
        currPos = getNewPosition(currPos, SOUTH);
        lastMove = SOUTH;
    } else if(getNextMove(WEST, getSymbolFromMap(map, getNewPosition(currPos, WEST)))) {
        currPos = getNewPosition(currPos, WEST);
        lastMove = WEST;
    } else {
        currPos = getNewPosition(currPos, EAST);
        lastMove = EAST;
    }

    let steps = 1;
    while(true) {
        const currentSymbol = getSymbolFromMap(map, currPos);
        const nextMove = getNextMove(lastMove, currentSymbol);
        currPos = getNewPosition(currPos, nextMove);
        
        lastMove = nextMove;
        steps++;

        if(getSymbolFromMap(map, currPos) === "S") break;
    }
    
    return steps / 2;
}

const getSymbolFromMap = (map, position) => map[position[0]][position[1]];
const getMap = () => readRowsFromFile(__dirname + "/data").map(r => r.split(""));
const getNewPosition = (currentPosition, move) => [ currentPosition[0] + move[0], currentPosition[1] + move[1]];

const getNextMove = (previousMove, symbol) => {
    if(symbol === "|" && previousMove[0] === -1) return NORTH;
    else if(symbol === "|" && previousMove[0] === 1) return SOUTH;
    else if(symbol === "-" && previousMove[1] === -1) return WEST;
    else if(symbol === "-" && previousMove[1] === 1) return EAST;
    else if(symbol === "L" && previousMove[1] === -1) return NORTH;
    else if(symbol === "L" && previousMove[0] === 1) return EAST;
    else if(symbol === "J" && previousMove[1] === 1) return NORTH;
    else if(symbol === "J" && previousMove[0] === 1) return WEST;
    else if(symbol === "7" && previousMove[1] === 1) return SOUTH;
    else if(symbol === "7" && previousMove[0] === -1) return WEST;
    else if(symbol === "F" && previousMove[1] === -1) return SOUTH;
    else if(symbol === "F" && previousMove[0] === -1) return EAST;
    
    return null;
}

const getStartCoordinates = (map) => {
    for(let i=0; i<map.length; i++) {
        for(let j=0; j<map[i].length; j++) {
            if(map[i][j] === "S") return [ i ,j ];
        }
    }
}

module.exports = run;