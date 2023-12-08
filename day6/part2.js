const { readRowsFromFile } = require("../utils");

const run = () => {
    const rows = readRowsFromFile(__dirname + '/data');

    const race = parseRace(rows);
 
    let count = 0;
    for(let j=0; j<=race.duration; j++) {
        const speed = j;
        const elapsedTime = race.duration - j;
        const distance = elapsedTime * speed;
        if(distance > race.record) count++;
    }
    
    return count;
}

const parseRace = (rows) => {
    return {
        duration: Number(rows[0].replaceAll(" ","").split(":")[1]), 
        record : Number(rows[1].replaceAll(" ","").split(":")[1])
    }
}

module.exports = run;

if(process.env['NODE_DEV'] == 'TEST') {
    module.exports.parseRace = parseRace;
}