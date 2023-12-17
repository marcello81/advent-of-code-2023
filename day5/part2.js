const { readRowsFromFile } = require("../utils");

const run = () => {
    const rows = readRowsFromFile(__dirname + '/data2');
    const maps = getMaps(rows);    
    
    let sources = getSeeds(rows[0]);
    let destinations = [];

    // go through each mapping step
    for(let i=0; i<maps.length; i++) {
        
        const map = maps[i];

        // go through the sources
        for(let j=0; j<sources.length; j++) {

            const source = sources[j];

            // go through the mappings
            for(let k=0; k<map.length; k++) {

                const mapping = map[k];
                const diff = mapping[1] - mapping[0];
                const sourceStart = source[0];
                const sourceEnd = source[0] + source[1] - 1;
                const mappingSrcStart = mapping[1];
                const mappingSrcEnd = mapping[1] + mapping[2];
                const mappingDestStart = source[0] - diff;
                const mappingDestLength = source[1];

                // lower than range
                if(sourceStart < mappingSrcStart && sourceEnd < mappingSrcStart) continue;

                // higher than range
                if(sourceStart > mappingSrcEnd && sourceEnd > mappingSrcEnd) continue;

                // inside the range
                if(sourceStart >= mappingSrcStart && sourceEnd <= mappingSrcEnd) {
                    destinations.push([mappingDestStart, mappingDestLength]);
                    break;
                }

                // from left to inside the range
                if(sourceStart >= mappingSrcStart && sourceEnd <= mappingSrcEnd) {
                    destinations.push([mappingDestStart, mappingDestLength]);
                    break;
                }
            }
        }

        sources = destinations;
    }

    return 0;
}

const getSeeds = (row) => {
    const seeds = [];
    let numbers = parseNumbers(row.split(": ")[1].split(" "));
    for(let i=0; i<numbers.length; i+=2) {
        seeds.push([ numbers[i], numbers[i+1]]); 
    }
    return seeds;
}

const getMaps = (rows) => {
    const maps = [];
    let tmpMap = [], i;

    for(i=3; i<rows.length; i++) {
        if(isNewMap(rows[i])) {
            maps.push(tmpMap);
            tmpMap = [];
            i++;
            continue;
        }
        
        tmpMap.push(getNumbers(rows[i]));                
    }
    maps.push(tmpMap);

    return maps; 
}

// utils
const isNewMap = row => row == "";
const parseNumbers = arr => arr.map(num => parseInt(num));
const getNumbers = row => parseNumbers(row.split(" "));

module.exports = run;