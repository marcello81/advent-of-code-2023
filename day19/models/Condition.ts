export class Condition {
    name: string;
    sign : string;
    value : number;

    constructor(name: string, sign: string, value: number) {
        this.name = name;
        this.sign = sign;
        this.value = value;
    }
}