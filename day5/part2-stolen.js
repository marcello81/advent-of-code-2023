const { readRowsFromFile } = require("../utils");

function run() {
    const rows = readRowsFromFile(__dirname + '/data');
    
    const index = getIndex(rows);
    const rowSeeds = rows.shift().split("seeds: ")[1].split(" ").map((e) => e.split(" ").map(Number)).flat();
    const mapsR = getMapsR(rows, index);
    const rangesOfSeeds = getRangesOfSeeds(rowSeeds);

    location = 0;
    let find = false;
    while (!find) {
        const possibleSeed = findSeed(location, [...mapsR]);
        if (isValid(possibleSeed, rangesOfSeeds)) {
            find = true;
        } else {
            location++;
        }
    }
    return location;
}

const getIndex = (rows) => {
    const index = [];
    rows.forEach((r, i) => { if (r.includes("map:")) index.push(i); });
    return index;
}

const isValid = (seed, rangesOfSeeds) => {
    for (const range of rangesOfSeeds) {
        if (seed >= range[0] && seed <= range[1]) return true;
    }
    return false;
}

const findSeed = (location, maps) => {
    if (maps.length === 0) return location;
    const mapArr = maps.shift();
    const len = mapArr.length;
    for (let i = 0; i < len; i++) {
        const rangeS = mapArr[i][0];
        const rangeE = mapArr[i][0] + mapArr[i][2];
        if (location >= rangeS && location <= rangeE) {
            const diff = rangeS - mapArr[i][1];
            return findSeed(location - diff, maps);
        }
    }
    return findSeed(location, maps);
}

const getMapsR = (rows, index) => {
    const seed_to_soil = [...rows].slice(index[0], index[1] - 2).map((e) => e.split(" ").map(Number));
    const soil_to_fertilizer = [...rows].slice(index[1], index[2] - 2).map((e) => e.split(" ").map(Number));
    const fertilizer_to_water = [...rows].slice(index[2], index[3] - 2).map((e) => e.split(" ").map(Number));
    const water_to_light = [...rows].slice(index[3], index[4] - 2).map((e) => e.split(" ").map(Number));
    const light_to_temperature = [...rows].slice(index[4], index[5] - 2).map((e) => e.split(" ").map(Number));
    const temperature_to_humidity = [...rows].slice(index[5], index[6] - 2).map((e) => e.split(" ").map(Number));
    const humidity_to_location = [...rows].slice(index[6]).map((e) => e.split(" ").map(Number));
    
    return [humidity_to_location, temperature_to_humidity, light_to_temperature, water_to_light, fertilizer_to_water, soil_to_fertilizer, seed_to_soil];
}

const getRangesOfSeeds = (rowSeeds) => {
    const rangesOfSeeds = [];
    rowSeeds.forEach((r, i) => { if (i % 2 === 0) rangesOfSeeds.push([rowSeeds[i], rowSeeds[i] + rowSeeds[i + 1] - 1]); });
    return rangesOfSeeds;
}

module.exports = run;