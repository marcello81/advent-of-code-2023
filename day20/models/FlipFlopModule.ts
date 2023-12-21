import { Pulse } from "./Pulse";
import { Module } from "./Module";
import { QueueItem } from "./QueueItem";

export class FlipFlopModule extends Module {
    on: boolean = false;

    run(origin: string, pulse: Pulse): QueueItem[] {
        if(pulse === Pulse.HIGH) return [];

        this.on = !this.on;
        
        const destinationPulse = this.on ? Pulse.HIGH : Pulse.LOW;    
                
        const items: QueueItem[] = [];
        for(const destination of this.destinations) {
            items.push({ origin: this.name, module: destination, pulse:destinationPulse });
        }
        return items;
    }
}