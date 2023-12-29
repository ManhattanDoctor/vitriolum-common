import { IAiTask } from "./IAiTask";

export interface IAiSttTask extends IAiTask {
    file: number;
}

export type AiSttTaskProgress = void;

export type AiSttTaskResponse = string;