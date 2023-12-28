export class Condition {
    name: number;
    sign : string;
    value : number;

    constructor(name: number, sign: string, value: number) {
        this.name = name;
        this.sign = sign;
        this.value = value;
    }
}