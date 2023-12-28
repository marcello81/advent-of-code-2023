import fs from "fs";
import { EOL } from "os";
import { Brick } from "./models/Brick";
import { Vector } from "./models/Vector";

const DATA: string = "data2";

const parseInput = (): Brick[] => {
    const bricks: Brick[] = [];
    const letters = "ABCDEFG";

    const maxs:number[] = [];
    const rows = fs.readFileSync(__dirname + '/' + DATA, "utf-8").split(EOL).map(r => r.split("~")).map((arr, i) => {
        const startArr = arr[0].split(",").map(n => Number(n));
        const endArr = arr[1].split(",").map(n => Number(n));
        const brick: Brick = { name: letters[i], start: {x: startArr[0], y: startArr[1], z: startArr[2]}, end: {x: endArr[0], y: endArr[1], z: endArr[2]} }             
        bricks.push(brick);        
    });
    
    bricks.sort( (a, b) => { const r = Math.min(a.start.z, a.end.z) - Math.min(b.start.z, b.end.z); return r<0 ? -1 : r>0 ? 1 : 0 });

    console.log(bricks);
    
    return bricks;
}

const visualize = (bricks: Brick[]) => {
    const cube: string[][][] = [];
    for(let i=0; i<=2; i++) {
        for(let j=0; j<=2; j++) {
            for(let k=1; k<=9; k++) {
                if(cube[i] === undefined) cube[i] = [];
                if(cube[i][j] === undefined) cube[i][j] = [];
                cube[i][j][k] = ".";
            }
        }

    }

    for(const brick of bricks) {        
        for(let x=brick.start.x; x<=brick.end.x; x++) {
            for(let y=brick.start.y; y<=brick.end.y; y++) {
                for(let z=brick.start.z; z<=brick.end.z; z++) {
                    cube[x][y][z] = brick.name;
                }
            }
        }        
    }
    console.log("\nVISUALIZE x - z:")    
    for(let z=cube[0][0].length-1; z>0; z--) {
        let row = "";
        for(let x=0; x<cube.length; x++) {
            let sign = ".";
            for(let y=0; y<cube[0].length; y++) {
                if(cube[x][y][z] !== ".") {
                    sign = cube[x][y][z];
                    break;
                }
            }
            row += sign;
        }
        console.log(row);
    }

    console.log("\nVISUALIZE y - z:")    
    for(let z=cube[0][0].length-1; z>0; z--) {
        let row = "";
        for(let y=0; y<cube[0].length; y++) {
            let sign = ".";
            for(let x=0; x<cube.length; x++) {
                if(cube[x][y][z] !== ".") {
                    sign = cube[x][y][z];
                    break;
                }
            }
            row += sign;
        }
        console.log(row);
    }
}

const isOverlapOnXAndYCoordinate = (a: Brick, b: Brick): boolean => {
    //a.start.x < b.start.x 
    return false;
}

const run = () => {
    const bricks: Brick[] = parseInput();

    const stacked: Brick[][] = [];
    for(const brick of bricks) {

        let i = 1;
        outer:
        while(true) {
            const levelBelow = stacked[brick.start.z - i];
            if(levelBelow) {
                for(const levelBelowBrick of levelBelow) {
                    if(isOverlapOnXAndYCoordinate(levelBelowBrick, brick)) break outer;
                }
            }
        }

    }

    visualize(bricks);


        
    console.log(0);
}

run();