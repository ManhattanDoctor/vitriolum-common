import { IOpenAiTextProgress, IOpenAiTextResponse } from "../model/openai";
import { IGigaChatTextProgress, IGigaChatTextResponse } from "../model/gigachat";
import { IFileContentSearchOptions } from "../../file";
import { IAiTask } from "./IAiTask";

export interface IAiTextTask extends IAiTask {
    message: string;

    files?: Array<number>;
    system?: string;
    fileSearchOptions?: IFileContentSearchOptions;
}

export type AiTextTaskProgress = IOpenAiTextProgress | IGigaChatTextProgress;

export type AiTextTaskResponse = IOpenAiTextResponse | IGigaChatTextResponse;

export const AI_TEXT_TASK_MESSAGE_MIN_LENGTH = 1;
export const AI_TEXT_TASK_MESSAGE_MAX_LENGTH = 128_000;

export const AI_TEXT_TASK_SYSTEM_MAX_LENGTH = 128_000;