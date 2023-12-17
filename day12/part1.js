const { readRowsFromFile } = require("../utils");

const count = (cfg, nums) => {      
    if(cfg.length === 0) return nums.length === 0 ? 1 : 0;
    if(nums.length === 0) return cfg.indexOf("#") > -1 ? 0 : 1;

    let result = 0;

    if(cfg[0] === "." || cfg[0] === "?") result += count(cfg.slice(1), nums);

    if(cfg[0] === "#" || cfg[0] === "?") {
        const doesItFit = nums[0] <= cfg.length;
        const noDotInRange = cfg.indexOf(".") === -1 || cfg.indexOf(".") >= nums[0];
        const isEndOfCfg = nums[0] === cfg.length;
        const signAfterRangeIsNoAmbersand = cfg[nums[0]] !== "#";
        
        if(doesItFit && noDotInRange && (isEndOfCfg || signAfterRangeIsNoAmbersand)) {
            result += count(cfg.slice(nums[0] + 1), nums.slice(1));
        }
    }
    return result;
}

const run = () => {
    const lines = readRowsFromFile(__dirname + '/data');

    let total = 0;

    for(let line of lines) {        
        let [cfg, numsStr] = line.split(" ");
        const nums = numsStr.split(",").map(n => Number(n));
        total += count(cfg, nums); 
    }

    return total;
}


module.exports = run;