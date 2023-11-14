import { IAiTask } from "./IAiTask";

export interface IAiImageTask extends IAiTask {
    prompt: string;
}

export type AiImageTaskProgress = Array<string>;

export type AiImageTaskResponse = Array<string>;

export const AI_IMAGE_TASK_PROMPT_MIN_LENGTH = 4;
export const AI_IMAGE_TASK_PROMPT_MAX_LENGTH = 1024;
