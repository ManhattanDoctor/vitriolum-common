import { IOpenAiModelDetails } from "./IOpenAiModel";

export interface IOpenAiSttOptions {
    model: string;
    prompt?: string;
    format?: string;
    language?: string;
}

export interface IOpenAiSttModelDetails extends IOpenAiModelDetails {
    formats: Array<string>;
}

export const OPEN_AI_STT_OPTIONS_MODEL_MIN_LENGTH = 4;
export const OPEN_AI_STT_OPTIONS_MODEL_MAX_LENGTH = 128;

export const OPEN_AI_STT_OPTIONS_FORMAT_MIN_LENGTH = 3;
export const OPEN_AI_STT_OPTIONS_FORMAT_MAX_LENGTH = 12;

export const OPEN_AI_STT_OPTIONS_PROMPT_MIN_LENGTH = 3;
export const OPEN_AI_STT_OPTIONS_PROMPT_MAX_LENGTH = 1024;

export const OPEN_AI_STT_OPTIONS_LANGUAGE_MIN_LENGTH = 3;
export const OPEN_AI_STT_OPTIONS_LANGUAGE_MAX_LENGTH = 24;