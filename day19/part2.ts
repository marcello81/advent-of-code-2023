import fs from "fs";
import { EOL } from "os";
import { Condition } from "./models/Condition";
import { Rule } from "./models/Rule";

const DATA: string = "data2";

const run = () => {
    const workflows : Map<string, Rule[]> = parseWorkflows();
    
    const currentPath : number[][] = [[0, 4001], [0,4001], [0,4001], [0,4001]];
    
    const acceptedPaths : number[][][] = [];
    collectAcceptedPaths(acceptedPaths, workflows, "in", currentPath);      
    
    console.log(getResult(acceptedPaths));
}

const parseWorkflows = (): Map<string, Rule[]> => {
    const workflowsStr = fs.readFileSync(__dirname + '/' + DATA, "utf-8").split(EOL+EOL)[0];  
    
    const workflows = new Map<string, Rule[]>();
    for(const workflowStr of workflowsStr.split(EOL)) {
        const [name, rulesStr] = workflowStr.split("{");                
        const rules: Rule[] = parseRules(rulesStr);        
        workflows.set(name, rules);
    }

    return workflows;
}

const parseRules = (rulesStr: string) => {
    const rules: Rule[] = [];
    rulesStr.slice(0, -1).split(",").map(ruleStr => {
        let condition: Condition | null = null;
        let goto: string = ruleStr;

        if (ruleStr.indexOf(":") !== -1) {
            const ruleStrSplit = ruleStr.split(":");
            const name = ruleStrSplit[0].slice(0, 1);            
            const sign = ruleStrSplit[0].slice(1, 2);
            const value = Number(ruleStrSplit[0].slice(2));
            condition = new Condition(name, sign, value);
            goto = ruleStrSplit[1];
        }
        rules.push(new Rule(condition, goto));
    });
    return rules;
}

const addConditionToPath = (path: number[][], condition: Condition, negate: boolean) => {
    let value = condition.value;
    
    if(condition.sign === "<" || (negate && condition.sign === ">")) {
        if(negate) value++;
        path[condition.name][1] = Math.min(path[condition.name][1], value);
    } else if (condition.sign === ">" || (negate && condition.sign === "<")) {
        if(negate) value--;
        path[condition.name][0] = Math.max(path[condition.name][0], value);
    }
}

function collectAcceptedPaths( acceptedPaths: number[][][], workflows: Map<string, Rule[]>, goto: string, currentPath: number[][]) {
    let rules = workflows.get(goto)!;
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];

        if (rule.goto === "R") continue;

        // add all previous condition to path (negated)
        const tmpPath: number[][] = currentPath.map(arr => arr.slice());
        for (let j = 0; j < i; j++) {
            addConditionToPath(tmpPath, rules[j].condition!, true);
        }

        if (rule.goto === "A") {
            acceptedPaths.push(tmpPath);
        } else {
            if(rule.condition) addConditionToPath(tmpPath, rule.condition, false);
            collectAcceptedPaths(acceptedPaths, workflows, rule.goto, tmpPath);
        }
    }
}

const getResult = (acceptedPaths: number[][][]) => {
    let result = 0;
    for (const path of acceptedPaths) {
        const multi = (path[0][1] - path[0][0]) * (path[1][1] - path[1][0]) * (path[2][1] - path[2][0]) * (path[3][1] - path[3][0]);
        console.log("[x:" + path[0][0] + "-" + path[0][1] + "][m:" + path[1][0] + "-" + path[1][1] + "][a:" + path[2][0] + "-" + path[2][1] + "][s:" + path[3][0] + "-" + path[3][1] + "]");
        if (multi > result) result = multi;
    }
    return result;
}

run();