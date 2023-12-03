const { readRowsFromFile } = require("../utils");

const maxes = { 
    "blue" : 14, 
    "red" : 12, 
    "green": 13 
};

const getValidGameNumber = (row) => {    
    const rowSplitted = row.split(": ");
    const gamesets = rowSplitted[1];
    const gamesetsSplitted = gamesets.split("; ");
          
    for(let i=0; i<gamesetsSplitted.length; i++) {
        const oneset = gamesetsSplitted[i];

        onesetSplitted = oneset.split(", ");

        for(let j=0; j<onesetSplitted.length; j++) {   
            const dice = onesetSplitted[j];
            const splitted = dice.split(" ");
            let theMax = maxes[splitted[1]]; 
            
            if(Number(splitted[0]) > theMax) return 0;
        }
    }

    return Number(rowSplitted[0].split(" ")[1]);
}

const run = () => {
    const data = readRowsFromFile(__dirname + '/data');
    let validGames = 0;
    
    data.forEach( game => {
        validGames += getValidGameNumber(game);
    });

    return validGames;
};

module.exports = run;