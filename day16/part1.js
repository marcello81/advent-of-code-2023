const { readRowsFromFile } = require("../utils");

const DATA = "data2";
const D = [">", "v" , "<", "^"];

const run = () => {
    const grid = readRowsFromFile(__dirname + '/' + DATA).map(row => row.split(""));    

    energized = [];
    
    doStep([0,0], 0, grid, energized);   

    let result = 0;
    for(arr of energized) {
        result += arr.reduce((acc, e) => acc+e);
    }
   
    return result;
}

// y, x

const doStep = (coordinates, direction, grid, energized) => {    
    if(energized[coordinates[0]] == undefined) energized[coordinates[0]] = [];
    energized[coordinates[0]][coordinates[1]] = 1;
       
    const tile = grid[coordinates[0]][coordinates[1]];

    if((direction === 0 || direction === 2) && tile === "|") {
        if(coordinates[0]-1 > 0) doStep([coordinates[0]-1, coordinates[1]], 3, grid, energized);
        if(coordinates[0]+1 < grid.length) doStep([coordinates[0]+1, coordinates[1]], 1, grid, energized);
    } else if (direction === 0 && (tile === "-" || tile === ".")) {
        if(coordinates[1]+1 < grid[0].length) doStep([coordinates[0], coordinates[1]+1], 0, grid, energized);
    } else if (direction === 0 && tile === "/") {
        if(coordinates[0]-1 > 0) doStep([coordinates[0]-1, coordinates[1]], 3, grid, energized);
    } else if (direction === 0 && tile === "\\") {
        if(coordinates[0]+1 < grid.length) doStep([coordinates[0]+1, coordinates[1]], 1, grid, energized);
    }

    else if(direction === 1 && (tile === "|" || tile === ".")) {
        if(coordinates[0]+1 < grid.length) doStep([coordinates[0]+1, coordinates[1]], 1, grid, energized);
    } else if ((direction === 1 || direction === 3) && tile === "-") {
        if(coordinates[1]-1 > 0) doStep([coordinates[0], coordinates[1]-1], 2, grid, energized);
        if(coordinates[1]+1 < grid[0].length) doStep([coordinates[0], coordinates[1]+1], 0, grid, energized);
    } else if (direction === 1 && tile === "/") {
        if(coordinates[1]-1 > 0) doStep([coordinates[0], coordinates[1]-1], 2, grid, energized);
    } else if (direction === 1 && tile === "\\") {
        if(coordinates[1]+1 < grid.length) doStep([coordinates[0], coordinates[1]+1], 3, grid, energized);
    }

    else if (direction === 2 && (tile === "-" || tile === ".")) {
        if(coordinates[1]-1 < grid[0].length) doStep([coordinates[0], coordinates[1]-1], 2, grid, energized);
    } else if (direction === 2 && tile === "/") {
        if(coordinates[0]+1 < grid.length) doStep([coordinates[0]+1, coordinates[1]], 1, grid, energized);
    } else if (direction === 2 && tile === "\\") {
        if(coordinates[1]-1 > 0) doStep([coordinates[0], coordinates[1]-1], 1, grid, energized);
    }

    else if(direction === 3 && (tile === "|" || tile === ".")) {
        if(coordinates[0]-1 > 0) doStep([coordinates[0]-1, coordinates[1]], 3, grid, energized);
    } else if (direction === 3 && tile === "\\") {
        if(coordinates[1]-1 > 0) doStep([coordinates[0], coordinates[1]-1], 2, grid, energized);
    } else if (direction === 3 && tile === "/") {
        if(coordinates[1]+1 < grid[0].length) doStep([coordinates[0], coordinates[1]+1], 0, grid, energized);
    }
}

module.exports = run;