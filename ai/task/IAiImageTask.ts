import { IOpenAiImageProgress, IOpenAiImageResponse } from "../model/openai";
import { IStableImageProgress, IStableImageResponse } from "../model/stable";
import { IGigaChatImageProgress, IGigaChatImageResponse } from "../model/gigachat";
import { IAiTask } from "./IAiTask";

export interface IAiImageTask extends IAiTask {
    prompt: string;
}

export type AiImageTaskProgress = IOpenAiImageProgress | IStableImageProgress | IGigaChatImageProgress;

export type AiImageTaskResponse = IOpenAiImageResponse | IStableImageResponse | IGigaChatImageResponse;

export const AI_IMAGE_TASK_PROMPT_MIN_LENGTH = 4;
export const AI_IMAGE_TASK_PROMPT_MAX_LENGTH = 1024;
