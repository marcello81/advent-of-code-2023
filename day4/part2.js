const { readRowsFromFile } = require("../utils");

const calculateCardCount = (cardCopyCounts) => {
    let sum = 0;

    for(let i = 0; i < cardCopyCounts.length; i++) {
        const num = Number(cardCopyCounts[i]);
        sum += num;
    };
    return sum;
}

const checkRows = (rows) => {
    const cardCopyCounts = Array(rows.length).fill(1);
    
    for(i=0; i<rows.length; i++) {
        const row = rows[i];

        let cardCount = cardCopyCounts[i];

        const numbers = row.split(": ")[1];
        const numsSplitted = numbers.split(" | ");

        const winningNums = new Set(numsSplitted[0].split(" "));
        winningNums.forEach(e => { if(e == "") winningNums.delete(e); });

        let count = 0;
        numsSplitted[1].split(" ").forEach(num => {
            if(winningNums.has(num)) {
                cardCopyCounts[i + count + 1] = cardCopyCounts[i + count + 1] + cardCount;
                count++;
            }
        });
    }

    return calculateCardCount(cardCopyCounts);
}

const run = () => {
    const rows = readRowsFromFile(__dirname + '/data');
    return checkRows(rows);
}

module.exports = run;