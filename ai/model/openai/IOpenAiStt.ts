import { IOpenAiModelDetails } from "./IOpenAiModel";

export interface IOpenAiSttOptions {
    model: OpenAiSttModel;
    prompt?: string;
    format?: string;
    language?: string;
    temperature?: number;
}

export enum OpenAiSttModel {
    WHISPER_1 = 'whisper-1'
}

export interface IOpenAiSttModelDetails extends IOpenAiModelDetails<OpenAiSttModel> {
    formats: Array<string>;
}

export const OPEN_AI_STT_OPTIONS_FORMAT_MIN_LENGTH = 3;
export const OPEN_AI_STT_OPTIONS_FORMAT_MAX_LENGTH = 12;

export const OPEN_AI_STT_OPTIONS_PROMPT_MIN_LENGTH = 3;
export const OPEN_AI_STT_OPTIONS_PROMPT_MAX_LENGTH = 1024;

export const OPEN_AI_STT_OPTIONS_LANGUAGE_MIN_LENGTH = 3;
export const OPEN_AI_STT_OPTIONS_LANGUAGE_MAX_LENGTH = 24;