import { Pulse } from "./Pulse";
import { QueueItem } from "./QueueItem";

export abstract class Module {
    static PULSE_COUNT = 0;    
    readonly name: string;
    readonly destinations: string[];   
    
    constructor(name:string, destinations: string[]) {
        this.name = name;
        this.destinations = destinations;
    }

    run(origin: string, pulse: Pulse): QueueItem[]{
        return [];
    };
}