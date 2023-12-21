import { Pulse } from "./Pulse";
import { Module } from "./Module";
import { QueueItem } from "./QueueItem";
import { Queue } from "./Queue";

export class ConjunctionModule extends Module {
    inputs: Map<string, Pulse> = new Map();

    run(origin: string, pulse: Pulse): QueueItem[] {
        this.inputs.set(origin, pulse);

        const destinationPulse = ([...this.inputs.values()].every(pulse => pulse === Pulse.HIGH)) ? Pulse.LOW: Pulse.HIGH;

        const items: QueueItem[] = [];
        for(const destination of this.destinations) {
            items.push({ origin: this.name, module: destination, pulse:destinationPulse });
        }
        return items;
    }

    addInput(name: string,) {
        this.inputs.set(name, Pulse.LOW);
    }
}