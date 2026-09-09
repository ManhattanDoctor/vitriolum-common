import { IOpenAiModelDetails } from "./IOpenAiModel";

export interface IOpenAiSttOptions {
    model: OpenAiSttModel;
    prompt?: string;
    language?: string;
    temperature?: number;
}

export enum OpenAiSttModel {
    GPT_TRANSCRIBE = 'gpt-transcribe',
    GPT_4_O_TRANSCRIBE = 'gpt-4o-transcribe',
    GPT_4_O_MINI_TRANSCRIBE = 'gpt-4o-mini-transcribe',

    /** @deprecated Legacy model. Use GPT_TRANSCRIBE instead. */
    WHISPER_1 = 'whisper-1',
}

/** Models offered for a new selection, the first one is used as the default */
export const OPEN_AI_STT_MODELS_ACTUAL: Array<OpenAiSttModel> = [
    OpenAiSttModel.GPT_TRANSCRIBE,
    OpenAiSttModel.GPT_4_O_TRANSCRIBE,
    OpenAiSttModel.GPT_4_O_MINI_TRANSCRIBE,
];

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