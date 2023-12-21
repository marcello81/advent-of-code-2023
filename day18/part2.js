const { readRowsFromFile } = require("../utils");

const DATA = "data";

const run = () => {
    const rows = parseInput();

    const edgeCoordinates = getEdgesCoordinates(rows);
    const perimeter = getPerimeter(rows);

    const area = getShoelaceArea(edgeCoordinates);
    const internalPoints = getPickInternalPoints(area, perimeter);

    return internalPoints + perimeter;
}

const parseInput = () => {
    const rows_pre = readRowsFromFile(__dirname + '/' + DATA).map(r => r.split("#")[1].substring(0, r.split("#")[1].length - 1));

    const map = { 0: "R", 1: "D", 2: "L", 3: "U" };

    return rows_pre.map(row => {
        const direction = map[parseInt(row[row.length - 1])];
        const steps = parseInt(row.substring(0, row.length - 1), 16);
        return [direction, steps];
    });
};

function getEdgesCoordinates(rows) {
    const edgesCoordinates = [{ i: 0, j: 0 }];

    for (let i=0; i<rows.length; i++) {
        const lastCor = edgesCoordinates[edgesCoordinates.length - 1];
        const [direction, steps] = rows[i];
        if (lastCor.i === 0 && lastCor.j + steps === 0) continue;
        if (direction === "R") edgesCoordinates.push({ i: lastCor.i, j: lastCor.j + steps });
        if (direction === "L") edgesCoordinates.push({ i: lastCor.i, j: lastCor.j - steps });
        if (direction === "D") edgesCoordinates.push({ i: lastCor.i + steps, j: lastCor.j });
        if (direction === "U") edgesCoordinates.push({ i: lastCor.i - steps, j: lastCor.j });
    }

    return edgesCoordinates;
}

const getPerimeter = (rows) => {
    let perimeter = 0;
    const len = rows.length;
    for (let i = 0; i < len; i++) {
        const [dir, num] = rows[i];
        if (dir === "R") {
            for (let c = 1; c <= num; c++) perimeter++;
        } else if (dir === "L") {
            for (let c = -1; c >= -num; c--) perimeter++;
        } else if (dir === "D") {
            for (let r = +1; r <= +num; r++) perimeter++;
        } else if (dir === "U") {
            for (let r = -1; r >= -num; r--) perimeter++;
        }
    }
    return perimeter;
}

const getShoelaceArea = (edgesCoordinates) => {   
    let a = 0;
    for (let i = 0; i < edgesCoordinates.length; i++) {
        let sup = i + 1 < edgesCoordinates.length ? i + 1 : 0;
        a += (edgesCoordinates[i].i * edgesCoordinates[sup].j - edgesCoordinates[i].j * edgesCoordinates[sup].i);
    }    
    return 0.5 * Math.abs(a)
}

const getPickInternalPoints = (area, perimeter) => area + 1 - perimeter / 2;

module.exports = run;