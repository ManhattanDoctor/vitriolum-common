import { IAiTask } from "./IAiTask";

export interface IAiTextTask extends IAiTask {
    task: string;
    role?: string;
    manner?: string;
    context?: string;
    example?: string;
}

export type IAiTextTaskProgress = string;
export type IAiTextTaskResponse = string;
