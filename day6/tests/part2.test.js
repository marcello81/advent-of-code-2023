process.env['NODE_DEV'] = 'TEST';
const part2 = require("../part2");

test("parse race from rows", () => {
    const rows = ["Time:      7  15   30", "Distance:  9  40  200"];
    const received = part2.parseRace(rows);
    expect(received).toStrictEqual({ duration: 71530, record: 940200});
});