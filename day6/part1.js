const { readRowsFromFile } = require("../utils");

const run = () => {
    const rows = readRowsFromFile(__dirname + '/data');

    const input = parseInput(rows);
    console.log(input);

    let result = 1;
    for(let i=0; i<input.length; i++) {

        const race = input[i];

        let count = 0;
        for(let j=0; j<=race.duration; j++) {
            const speed = j;
            const elapsedTime = race.duration - j;
            const distance = elapsedTime * speed;

            if(distance > race.record) count++;
        }

        result *= count;
    }

    return result;
}

const parseInput = (rows) => {
    const input = [];
    rows[0].split(": ")[1].split(" ").map(el => el.trim()).filter(n => n).forEach( num => { input.push({ duration: Number(num), record : 0 }); });
    rows[1].split(": ")[1].split(" ").map(el => el.trim()).filter(n => n).forEach( (num, i) => { input[i].record = Number(num); });
    return input;
}

module.exports = run;