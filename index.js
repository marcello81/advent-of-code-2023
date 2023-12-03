const day1part1 = require("./day1/part1");
const day1part2 = require("./day1/part2");
const day2part1 = require("./day2/part1");
const day2part2 = require("./day2/part2");
const day3part1 = require("./day3/part1");
const day3part2 = require("./day3/part2");

const CURRENT_DAY = 2;

const printDay = (day, func1, func2) => {
    console.log("\nDAY " + day);
    console.log(" - part 1: " + func1());
    console.log(" - part 2: " + func2())
}

console.log("===================================");
console.log("# ADVENT OF CODE 2023 - SOLUTIONS #");
console.log("===================================");

printDay( 1, day1part1, day1part2);
printDay( 2, day2part1, day2part2);
printDay( 3, day3part1, day3part2);