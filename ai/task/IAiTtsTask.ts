import { IAiTask } from "./IAiTask";

export interface IAiTtsTask extends IAiTask {
    text: string;
}

export type AiTtsTaskProgress = void;

export type AiTtsTaskResponse = string;

export const AI_TTS_TASK_TEXT_MIN_LENGTH = 4;
export const AI_TTS_TASK_TEXT_MAX_LENGTH = 8196;