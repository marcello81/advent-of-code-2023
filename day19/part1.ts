import fs from "fs";
import { EOL } from "os";
import { Workflow } from "./models/Workflow";
import { Condition } from "./models/Condition";
import { Rule } from "./models/Rule";

const DATA: string = "data";

const parseInput = (): [Map<string, Workflow>, number[][]] => {
    const [workflowsStr, partRatingsStr] = fs.readFileSync(__dirname + '/' + DATA, "utf-8").split(EOL+EOL);  
    
    const workflows = new Map<string, Workflow>();
    for(const workflowStr of workflowsStr.split(EOL)) {
        const [name, rulesStr] = workflowStr.split("{");
                
        const rules: Rule[] = [];
        rulesStr.slice(0,-1).split(",").map(ruleStr => {
            let condition: Condition | null = null;
            let goto: string = ruleStr;
            
            if(ruleStr.indexOf(":") !== -1) {
                const ruleStrSplit = ruleStr.split(":");
                const nameStr = ruleStrSplit[0].slice(0,1);
                const name = nameStr === "x" ? 0 : ( nameStr === "m" ? 1 : (nameStr === "a" ? 2 : 3));
                const sign = ruleStrSplit[0].slice(1,2) === "<" ? lessThan : greaterThan;
                const value = Number(ruleStrSplit[0].slice(2));
                condition = new Condition(name, sign, value);
                goto = ruleStrSplit[1];
            }
            rules.push(new Rule(condition, goto));
        });
        
        workflows.set(name, new Workflow(name, rules));
    }

    const partRatings : number[][] = [];
    for(const partRatingStr of partRatingsStr.split(EOL)) {
        const ratings: number[] = partRatingStr.slice(1,-1).split(",").map(part => Number(part.split("=")[1]));
        partRatings.push(ratings);
    }

    return [workflows, partRatings];
}

const lessThan = (partValue: number, conditionValue: number): boolean => partValue < conditionValue;
const greaterThan = (partValue: number, conditionValue: number): boolean => partValue > conditionValue;

const run = () => {
    const [workflows, partRatings] : [Map<string, Workflow>, number[][]] = parseInput();
    
    let sum: number = 0;
    for(const partRating of partRatings) {
        let currentWorkflow : Workflow = workflows.get("in")!;
        let isAccepted : boolean = false;        
        
        outer:
        while(true) {
            for(const rule of currentWorkflow.rules) {
                if(rule.condition === null || rule.condition.sign(partRating[rule.condition.name], rule.condition.value)) {
                    if(rule.goto === "A" || rule.goto === "R") {
                        if(rule.goto === "A") isAccepted = true;
                        break outer;
                    } else {
                        currentWorkflow = workflows.get(rule.goto)!;
                        continue outer;
                    }
                }                
            }
        }

        if(isAccepted) {
            sum += sumup(partRating);
        }
    }

    console.log(sum);
}

const sumup = (partRating: number[]) : number => partRating.reduce((total, el) => total+el);

run();