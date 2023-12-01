import { IOpenAiImageProgress, IOpenAiImageResponse } from "../model/openai";
import { IStableImageProgress, IStableImageResponse } from "../model/stable";
import { IAiTask } from "./IAiTask";

export interface IAiImageTask extends IAiTask {
    prompt: string;
}

export type AiImageTaskProgress = IOpenAiImageProgress | IStableImageProgress;

export type AiImageTaskResponse = IOpenAiImageResponse | IStableImageResponse;

export const AI_IMAGE_TASK_PROMPT_MIN_LENGTH = 4;
export const AI_IMAGE_TASK_PROMPT_MAX_LENGTH = 1024;
