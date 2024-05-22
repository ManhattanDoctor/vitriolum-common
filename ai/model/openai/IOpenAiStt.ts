import { IOpenAiModelDetails } from "./IOpenAiModel";

export interface IOpenAiSttOptions {
    model: OpenAiSttModel;
    prompt?: string;
    language?: string;
    temperature?: number;
}

export enum OpenAiSttModel {
    WHISPER_1 = 'whisper-1'
}

export interface IOpenAiSttModelDetails extends IOpenAiModelDetails<OpenAiSttModel> { }

export type IOpenAiSttProgress = void;

export type IOpenAiSttResponse = string;

export type IOpenAiSttConsumption = number;

export const OPEN_AI_STT_OPTIONS_PROMPT_MIN_LENGTH = 3;
export const OPEN_AI_STT_OPTIONS_PROMPT_MAX_LENGTH = 1024;

export const OPEN_AI_STT_OPTIONS_LANGUAGE_MIN_LENGTH = 2;
export const OPEN_AI_STT_OPTIONS_LANGUAGE_MAX_LENGTH = 24;

export const OPEN_AI_STT_OPTIONS_TEMPERATURE_MIN = 0;
export const OPEN_AI_STT_OPTIONS_TEMPERATURE_MAX = 1;