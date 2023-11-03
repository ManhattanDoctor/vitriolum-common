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

export const AI_TEXT_TASK_MIN_LENGTH = 4;
export const AI_TEXT_TASK_MAX_LENGTH = 8196;

export const AI_TEXT_TASK_ROLE_MIN_LENGTH = 4;
export const AI_TEXT_TASK_ROLE_MAX_LENGTH = 512;

export const AI_TEXT_TASK_MANNER_MIN_LENGTH = 4;
export const AI_TEXT_TASK_MANNER_MAX_LENGTH = 256;

export const AI_TEXT_TASK_CONTEXT_MIN_LENGTH = 4;
export const AI_TEXT_TASK_CONTEXT_MAX_LENGTH = 1024;

export const AI_TEXT_TASK_EXAMPLE_MIN_LENGTH = 4;
export const AI_TEXT_TASK_EXAMPLE_MAX_LENGTH = 512;
