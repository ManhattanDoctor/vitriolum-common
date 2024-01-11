import { IOpenAiTextProgress, IOpenAiTextResponse } from "../model/openai";
import { IAiTask } from "./IAiTask";

export interface IAiTextTask extends IAiTask {
    message: string;
    system?: string;
}

export type AiTextTaskProgress = IOpenAiTextProgress;

export type AiTextTaskResponse = IOpenAiTextResponse;

export const AI_TEXT_TASK_MESSAGE_MIN_LENGTH = 1;
export const AI_TEXT_TASK_MESSAGE_MAX_LENGTH = 128000;

export const AI_TEXT_TASK_SYSTEM_MAX_LENGTH = 128000;