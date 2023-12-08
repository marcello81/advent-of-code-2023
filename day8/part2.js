const { readRowsFromFile } = require("../utils");

const run = () => {
    const rows = readRowsFromFile(__dirname + '/data');

    const instructions = rows[0].split("").map(c => c === "L" ? 0 : 1);
    const map = getMap(rows);
    
    let currents = getStartingNodes(map);

    const steps =[];
    for(let i=0; i<currents.length; i++) {
        steps.push(getStepsToDestination(instructions, map, currents[i]));
    }

    return steps.reduce( lcm );
}

const lcm = (a, b) => a * b / gcd(a, b);
const gcd = (a, b) => a ? gcd(b % a, a) : b;

const getStepsToDestination = (instructions, map, node) => {
    let steps = 1;
    let current = node;
    while(true) {
        const index = instructions[(steps-1) % instructions.length];
        
        current = map.get(current)[index];
       
        if(current[2] === "Z") break;

        steps++;
    }
    return steps;
}

const getStartingNodes = map => Array.from(map.keys()).filter(parent => parent[parent.length-1] === "A");

const getMap = (rows) => {
    const map = new Map();
    for (let i = 2; i < rows.length; i++) {
        const [parent, children] = rows[i].split(" = ");
        const [childL, childR] = children.split(", ");
        map.set(parent, [childL.slice(1), childR.slice(0, -1)]);
    }
    return map;
}

module.exports = run;