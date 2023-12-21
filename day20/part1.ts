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
    let high: number = 0;
    let low: number = 0;
    
    const modules = parseInput();

    for(let i=0; i<1000; i++) {
        QUEUE.enqueue({ origin: "", module: "broadcaster", pulse: Pulse.LOW });

        while(QUEUE.isEmpty() === false) {        
            const item = QUEUE.dequeue()!;

            item.pulse === Pulse.HIGH ? high++ : low++;
       
            const module = modules.get(item.module);
            if(module) {
                const newItems = module.run(item.origin, item.pulse);
                for(const newItem of newItems) QUEUE.enqueue(newItem);
            }
        }
    }

    console.log(high * low);
}

run();