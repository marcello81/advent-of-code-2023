const { readRowsFromFile } = require("../utils");

const run = () => {
    const histories = getHistories();
    let results = getResults(histories);
    return results.reduce((sum, n) => sum + n);
}

const getHistories = () => {
    let rows = readRowsFromFile(__dirname + "/data2");
    rows = rows.map(r => r.split(" "));

    const histories = [];
    for(let i=0; i<rows.length; i++) {
        histories.push(rows[i].map(n => Number(n)));
    }
    return histories;
}

function getResults(histories) {
    let results = [];
    for (let i = 0; i < histories.length; i++) {
        const history = histories[i];

        let round = 0;
        while (true) {
            for (let j = 0; j < history.length - 1 - round; j++) {
                history[j] = history[j + 1] - history[j];
            }
            round++;
            const isAllZero = history.slice(0, -round).every(n => n == 0);

            if (isAllZero) break;
        }

        results[i] = history.slice(-round).reduce((sum, n) => sum + n);
    }
    return results;
}

module.exports = run;