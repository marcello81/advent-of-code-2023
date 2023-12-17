const { readRowsFromFile } = require("../utils");

const DATA = "data";

const NORTH = [-1,0];
const SOUTH = [1,0];
const WEST = [0,-1];
const EAST = [0,1];

const run = () => {
    const loop = [];
    const map = getMap();

    let startPos = getStartCoordinates(map); // [y, x]
    let currPos = startPos;
    let lastMove;

    loop.push(currPos);
    
    ({ lastMove, currPos } = getFirstPositionAndMoveAfterStart(map, currPos));
    loop.push(currPos);

    while(true) {
        const currentSymbol = getSymbolFromMap(map, currPos);
        const nextMove = getNextMove(lastMove, currentSymbol);
        currPos = getNewPosition(currPos, nextMove);
                
        lastMove = nextMove;

        if(getSymbolFromMap(map, currPos) === "S") break;

        loop.push(currPos);
    }

    replaceStart(map, startPos);

    const enclosedByLoop = [];
    for(let i=0; i<map.length; i++){
        for(let j=0; j<map[i].length; j++){
            if(isInLoop(loop, [i,j])) continue;

            let crossed = 0;
            for(let k=j+1; k<map[0].length; k++) {
                if(isInLoop(loop, [i, k]) === false) continue;

                if(map[i][k] === "|" || map[i][k] === "S") {
                    crossed++;
                } else if(map[i][k] === "L") {
                    for(let m=k+1; m<map[0].length; m++) {
                        if(map[i][m] === "7" && isInLoop(loop, [i, m])) {
                            crossed++;
                            k=m;
                            break;
                        } else if (map[i][m] === "-" && isInLoop(loop, [i, m])) {
                            continue;
                        }
                        break;
                    }
                } else if(map[i][k] === "F") {
                    for(let m=k+1; m<map[0].length; m++) {
                        if(map[i][m] === "J" && isInLoop(loop, [i, m])) {
                            crossed++;
                            k=m;
                            break;
                        } else if (map[i][m] === "-" && isInLoop(loop, [i, m])) {
                            continue;
                        }
                        break;
                    }
                }
            }

            if(crossed > 0 && crossed % 2 == 1) enclosedByLoop.push([i, j]);
        }
    }

    return enclosedByLoop.length;
}

const replaceStart = (map, startPos) => {
    const northIsPossible = startPos[0]>0 && ["|", "7", "F"].includes(map[startPos[0]-1][startPos[1]]);
    const southIsPossible = startPos[0]<map.length-1 && ["|", "J", "L"].includes(map[startPos[0]+1][startPos[1]]);
    const westIsPossible = startPos[1]>0 && ["-", "L", "F"].includes(map[startPos[0]][startPos[1]-1]);
    const eastIsPossible = startPos[1]<map[0].length-1 && ["-", "J", "7"].includes(map[startPos[0]][startPos[1]+1]);
    
    let replaceSymbol;
    if(northIsPossible && southIsPossible) replaceSymbol = "|"
    else if(northIsPossible && eastIsPossible) replaceSymbol = "L"
    else if(northIsPossible && westIsPossible) replaceSymbol = "J"
    else if(southIsPossible && eastIsPossible) replaceSymbol = "F"
    else if(southIsPossible && westIsPossible) replaceSymbol = "7";

    map[startPos[0]][startPos[1]] = replaceSymbol;
}

function isInLoop(loop, coordinates) {
    for(let i=0; i<loop.length; i++) {
        if(loop[i][0] === coordinates[0] && loop[i][1] === coordinates[1]) return true;
    }
    return false;
}   

const getSymbolFromMap = (map, position) => map[position[0]][position[1]];
const getMap = () => readRowsFromFile(__dirname + "/" + DATA).map(r => r.split(""));
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

function getFirstPositionAndMoveAfterStart(map, currPos) {
    let lastMove;
    if (currPos[0] - 1 >=0 && getNextMove(NORTH, getSymbolFromMap(map, getNewPosition(currPos, NORTH)))) {
        currPos = getNewPosition(currPos, NORTH);
        lastMove = NORTH;
    } else if (currPos[0] + 1 <= map.length && getNextMove(SOUTH, getSymbolFromMap(map, getNewPosition(currPos, SOUTH)))) {
        currPos = getNewPosition(currPos, SOUTH);
        lastMove = SOUTH;
    } else if (currPos[1] - 1 >= 0 && getNextMove(WEST, getSymbolFromMap(map, getNewPosition(currPos, WEST)))) {
        currPos = getNewPosition(currPos, WEST);
        lastMove = WEST;
    } else if (currPos[1] + 1 <= map[0].length) {
        currPos = getNewPosition(currPos, EAST);
        lastMove = EAST;
    }
    return { lastMove, currPos };
}
