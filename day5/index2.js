const { readRowsFromFile } = require("../utils");

const isNewMap = row => row == "";
const parseNumbers = arr => arr.map(num => parseInt(num));
const getNumbers = row => parseNumbers(row.split(" "));

const getMaps = (rows) => {
    const mappings = [];
    let tmpMap = [], i;

    for(i=3; i<rows.length; i++) {
        if(isNewMap(rows[i])) {
            mappings.push(tmpMap);
            tmpMap = [];
            i++;
            continue;
        }
        
        let nums = getNumbers(rows[i]);
        
        for(let j=nums[1]; j<nums[1] + nums[2]; j++) {
            tmpMap[j] = nums[0] + j - nums[1];
        }
    }
    mappings.push(tmpMap);

    console.log(mappings);
}

const rows = readRowsFromFile(__dirname + '/data');
const sourceRanges = parseNumbers(rows[0].split(": ")[1].split(" "));
    
const maps = getMaps(rows);    