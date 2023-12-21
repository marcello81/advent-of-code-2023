import fs from "fs";
import { EOL } from "os";
import { Pulse } from "./models/Pulse";
import { Queue } from "./models/Queue";
import { Module } from "./models/Module";
import { FlipFlopModule } from "./models/FlipFlopModule";
import { ConjunctionModule } from "./models/ConjunctionModule";
import { BroadcastModule } from "./models/BroadcastModule";

const DATA: string = "data";

const QUEUE : Queue = new Queue();

const parseInput = () => {
    const modulesStr = fs.readFileSync(__dirname + '/' + DATA, "utf-8").split(EOL); 
    
    const modules : Map<string, Module> = new Map();

    for(const moduleStr of modulesStr) {
        const [typeNameStr, destinationStr] = moduleStr.split(" -> ");
        
        const nameStartIndex = typeNameStr === "broadcaster" ? 0 : 1;
        const type = typeNameStr.slice(0,nameStartIndex);
        const name = typeNameStr.slice(nameStartIndex);

        const destinations = destinationStr.split(",").map(d => d.trim());

        if(type === "%") {
            modules.set(name, new FlipFlopModule(name, destinations));
        } else if( type === "&") {
            modules.set(name, new ConjunctionModule(name, destinations));
        } else {
            modules.set(name, new BroadcastModule(name, destinations));
        }
    }   

    for(const tmpModule of modules.values()) {        
        if(tmpModule instanceof ConjunctionModule === false) continue;
    
        const conjunctionModule = tmpModule as ConjunctionModule; 
        
        for(const module of modules.values()) {
            if(module.destinations.includes(conjunctionModule.name)) {
                conjunctionModule.addInput(module.name);
            }
        }
    }

    return modules;
}

const run = () => {    
    const modules = parseInput();

    const conToRx: string = [...modules.values()].filter(m => m.destinations.includes("rx"))[0].name;
    
    const cycleLengths: Map<string, number> = new Map();    
    
    let seen: Map<string, number> = new Map();;
    [...modules.values()].filter(m => m.destinations.includes(conToRx)).map(m => m.name).forEach(n => seen.set(n, 0));
            
    let presses = 0;
    
    outer:
    while (true) {
        presses++;       
        QUEUE.enqueue({ origin: "", module: "broadcaster", pulse: Pulse.LOW });
       
        while(QUEUE.isEmpty() === false) {        
            const item = QUEUE.dequeue()!;
      
            if(item.module === conToRx && item.pulse === Pulse.HIGH) {
                seen.set(item.origin, seen.get(item.origin)! + 1);

                if(cycleLengths.has(item.origin) === false) {
                    cycleLengths.set(item.origin, presses);
                }

                if([...seen.values()].every(e => e > 0)) {
                    let result = 1;
                    for(let cycleLength of cycleLengths.values())
                        result = lcm(result, cycleLength); 
                    console.log(result);
                    break outer;
                }
            }

            const module = modules.get(item.module);
            if(module) {
                const newItems = module.run(item.origin, item.pulse);
                for(const newItem of newItems) QUEUE.enqueue(newItem);
            }
        }
    }
}

const lcm = (a: number, b: number): number => a * b / gcd(a, b);
const gcd = (a: number, b: number): number => a ? gcd(b % a, a) : b;

run();