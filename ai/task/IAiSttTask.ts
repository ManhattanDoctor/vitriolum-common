import { IAiTask } from "./IAiTask";

export interface IAiSttTask extends IAiTask {
    file: string;
}

export type AiSttTaskProgress = void;

export type AiSttTaskResponse = string;

export const AI_STT_TASK_FILE_MIN_LENGTH = 4;
export const AI_STT_TASK_FILE_MAX_LENGTH = 1048576;