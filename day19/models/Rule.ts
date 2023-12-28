import { Condition } from "./Condition";

export class Rule {
    condition: Condition | null;
    goto: string;

    constructor(condition: Condition|null, goto: string) {
        this.condition = condition;
        this.goto = goto;
    }
}