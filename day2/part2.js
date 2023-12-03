const { readRowsFromFile } = require("../utils");

const getPowerOfHighestCounts = (row) => {    
    const gamesets = row.split(": ")[1];
    const gamesetsSplitted = gamesets.split("; ");

    let hightestR = 0;
    let hightestG = 0;
    let hightestB = 0;
          
    for(let i=0; i<gamesetsSplitted.length; i++) {
        const oneset = gamesetsSplitted[i];

        onesetSplitted = oneset.split(", ");

        for(let j=0; j<onesetSplitted.length; j++) {   
            const dice = onesetSplitted[j];
            const splitted = dice.split(" ");
            let color = splitted[1]; 
            let num = Number(splitted[0]);

            if(color == "red" && num > hightestR) hightestR = num;
            else if(color == "green" && num > hightestG) hightestG = num;
            else if(color == "blue" && num > hightestB) hightestB = num;                    
        }
    }

    return hightestR * hightestB * hightestG;
}

const run = () => {
    const data = readRowsFromFile(__dirname + '/data');
    let validGames = 0;
    
    data.forEach( game => {
        validGames += getPowerOfHighestCounts(game);
    });

    return validGames;
}

module.exports = run;