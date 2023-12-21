const { readRowsFromFile } = require("../utils");

const DATA = "data";  // 61695 - TOO HIGH, 59211 -  TOOO LOW

const run = () => {
    const rows = parseInput();

    const edgeCoordinates = getEdgesCoordinates(rows);
    const perimeter = getPerimeter(rows);

    const area = getShoelaceArea(edgeCoordinates);
    const internalPoints = getPickInternalPoints(area, perimeter);

    return internalPoints + perimeter;
}

const parseInput = () => {
    let rows = readRowsFromFile(__dirname + '/' + DATA);
    return rows.map(r => r.split(" (")[0].split(" ").map((e, i) => (i % 2 !== 0 ? parseInt(e) : e)));    
};

function getEdgesCoordinates(rows) {
    const edgesCoordinates = [{ i: 0, j: 0 }];

    for (let i=0; i<rows.length; i++) {
        const lastCor = edgesCoordinates[edgesCoordinates.length - 1];
        const [dir, num] = rows[i];
        if (lastCor.i === 0 && lastCor.j + num === 0) continue;
        if (dir === "R") edgesCoordinates.push({ i: lastCor.i, j: lastCor.j + num });
        if (dir === "L") edgesCoordinates.push({ i: lastCor.i, j: lastCor.j - num });
        if (dir === "D") edgesCoordinates.push({ i: lastCor.i + num, j: lastCor.j });
        if (dir === "U") edgesCoordinates.push({ i: lastCor.i - num, j: lastCor.j });
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