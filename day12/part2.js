const { readRowsFromFile } = require("../utils");

const cache = new Map();

const count = (cfg, nums) => {      
    if(cfg.length === 0) return nums.length === 0 ? 1 : 0;
    if(nums.length === 0) return cfg.indexOf("#") > -1 ? 0 : 1;

    const key = cfg + nums.join(",");
   
    if(cache.has(key)) return cache.get(key);

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

    cache.set(key, result);
    return result;
}

const run = () => {
    const lines = readRowsFromFile(__dirname + '/data');

    let total = 0;

    for(let line of lines) {        
        let [cfg, numsStr] = line.split(" ");

        let unfoldedCfg = cfg;
        let unfoldedNumsStr = numsStr;
        
        for(let i=0; i<4; i++) {
            unfoldedCfg += "?" + cfg;
            unfoldedNumsStr += "," + numsStr;
        }
        
        let unfoldedNums = unfoldedNumsStr.split(",").map(n => Number(n));

        total += count(unfoldedCfg, unfoldedNums); ;
    }

    return total;
}

module.exports = run;