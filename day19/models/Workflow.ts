import { Rule } from "./Rule";

export class Workflow {
    name: string;
    rules: Rule[];

    constructor(name: string, rules: Rule[]) {
        this.name = name;
        this.rules = rules;
    }
}