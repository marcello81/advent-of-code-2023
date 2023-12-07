const { readRowsFromFile } = require("../utils");

const run = () => {
    const rows = readRowsFromFile(__dirname + '/data');
    return checkRows(rows);
}

const checkRows = (rows) => {
    const sources = getSeeds(rows[0]);
    const destinations = [];
      
    let i;
    for(i=3; i<rows.length; i++) {
        if(isNewMap(rows[i])) {
            copyDestinationsToSources(sources, destinations);  
            i++;
            continue;
        }

        const nums = getNumbers(rows[i]);
        findDestination(sources, nums, destinations);
    }

    return Math.min.apply(null, destinations);    
}

const copyDestinationsToSources = (sources, destinations) => {
    let k;
    for (k = 0; k < sources.length; k++) {
        if (destinations[k]) {
            sources[k] = destinations[k];
        }
    }
}

const findDestination = (sources, nums, destinations) => {
    let j;
    for (j = 0; j < sources.length; j++) {
        const sourcesRangeStart = Number(nums[1]);
        const sourcesRangeEnd = sourcesRangeStart + nums[2] - 1;

        if (sources[j] >= sourcesRangeStart && sources[j] <= sourcesRangeEnd) {
            const destinationsRangeStart = Number(nums[0]);
            destinations[j] = sources[j] + destinationsRangeStart - sourcesRangeStart;
            continue;
        }
    }
}

// utils
const isNewMap = row => row == "";
const parseNumbers = arr => arr.map(num => parseInt(num));
const getSeeds = row =>  parseNumbers(row.split(": ")[1].split(" "));
const getNumbers = row => parseNumbers(row.split(" "));

module.exports = run;