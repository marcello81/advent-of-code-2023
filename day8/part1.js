const { readRowsFromFile } = require("../utils");

const run = () => {
    const rows = readRowsFromFile(__dirname + "/data");

    const instructions = rows[0].split("").map((c) => (c == "L" ? 0 : 1));
    const map = getMap(rows);

    let steps = 1;
    let current = "AAA";
    while (true) {
        const index = instructions[(steps - 1) % instructions.length];
        current = map.get(current)[index];

        if (current == "ZZZ") break;

        steps++;
    }

    return steps;
};

const getMap = (rows) => {
    const map = new Map();
    for (let i = 2; i < rows.length; i++) {
        const [parent, children] = rows[i].split(" = ");
        const [childL, childR] = children.split(", ");
        map.set(parent, [childL.slice(1), childR.slice(0, -1)]);
    }
    return map;
};

module.exports = run;
