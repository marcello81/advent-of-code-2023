import { Module } from "./Module";
import { Pulse } from "./Pulse";

export type QueueItem = {
    origin: string;
    module: string;
    pulse: Pulse;
}