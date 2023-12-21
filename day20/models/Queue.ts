import { Module } from "./Module";
import { Pulse } from "./Pulse";
import { QueueItem } from "./QueueItem";

export class Queue {
    items: QueueItem[] = [];
        
    enqueue(item: QueueItem) {
        this.items.push(item);
    }

    dequeue(): QueueItem | undefined {
        return this.items.shift();
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}