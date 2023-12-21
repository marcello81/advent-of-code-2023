import { Module } from "./Module";
import { Pulse } from "./Pulse";
import { QueueItem } from "./QueueItem";

export class BroadcastModule extends Module {

    run(origin: string, pulse: Pulse): QueueItem[] {                        
        const items: QueueItem[] = [];
        for(const destination of this.destinations) {
            items.push({ origin: this.name, module: destination, pulse: pulse });
        }
        return items;
    }  
}