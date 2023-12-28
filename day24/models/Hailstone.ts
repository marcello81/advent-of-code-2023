export class Hailstone {
    sx: number;
    sy: number;
    sz: number;

    vx: number;
    vy: number;
    vz: number;

    a: number;
    b: number;
    c: number;

    constructor(...arr: number[]) {
        this.sx = arr[0];
        this.sy = arr[1];
        this.sz = arr[2];

        this.vx = arr[3];
        this.vy = arr[4];
        this.vz = arr[5];

        this.a = this.vy;
        this.b = -this.vx;
        this.c = this.vy * this.sx - this.vx * this.sy;
    }
}