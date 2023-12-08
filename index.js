const day1part1 = require("./day1/part1");
const day1part2 = require("./day1/part2");
const day2part1 = require("./day2/part1");
const day2part2 = require("./day2/part2");
const day3part1 = require("./day3/part1");
const day3part2 = require("./day3/part2");
const day4part1 = require("./day4/part1");
const day4part2 = require("./day4/part2");
const day5part1 = require("./day5/part1");
const day5part2 = require("./day5/part2-stolen");
const day6part1 = require("./day6/part1");
const day6part2 = require("./day6/part2");
const day7part1 = require("./day7/part1");
const day7part2 = require("./day7/part2");
const day8part1 = require("./day8/part1");
const day8part2 = require("./day8/part2");

const CURRENT_DAY = 2;

const printDay = (day, func1, func2) => {
    console.log("\nDAY " + day);
    console.log(" - part 1: " + func1());
    console.log(" - part 2: " + func2())
}

console.log("===================================");
console.log("# ADVENT OF CODE 2023 - SOLUTIONS #");
console.log("===================================");

/*
printDay( 1, day1part1, day1part2);
printDay( 2, day2part1, day2part2);
printDay( 3, day3part1, day3part2);
printDay( 4, day4part1, day4part2);
printDay( 5, day5part1, day5part2);
printDay( 6, day6part1, day6part2);
printDay( 7, day7part1, day7part2);
*/
printDay( 8, day8part1, day8part2);