import { AiModelConsumption } from "../../ai";

export enum AiTaskEvent {
    PROGRESSED = 'PROGRESSED'
}
export type IAiTaskConsumption = AiModelConsumption;

export interface IAiTaskProgress<T> {
    data?: T;
    total?: number;
    percent?: number;
    current?: number;
}