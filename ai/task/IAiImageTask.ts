import { IAiTask } from "./IAiTask";

export interface IAiImageTask extends IAiTask {
    prompt: string;
    negativePrompt?: string;
}

export type IAiImageTaskProgress = Array<string>;

export type IAiImageTaskResponse = Array<string>;

export const AI_IMAGE_TASK_PROMPT_MIN_LENGTH = 4;
export const AI_IMAGE_TASK_PROMPT_MAX_LENGTH = 1024;

export const AI_IMAGE_TASK_NEGATIVE_PROMPT_MIN_LENGTH = 4;
export const AI_IMAGE_TASK_NEGATIVE_PROMPT_MAX_LENGTH = 1024;
