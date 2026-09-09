import { IOpenAiModelDetails } from "./IOpenAiModel";

export interface IOpenAiTtsOptions {
    model: OpenAiTtsModel;
    voice: OpenAiTtsVoice;
    speed?: number;
    format?: OpenAiTtsFormat;
}

export enum OpenAiTtsModel {
    GPT_4_O_MINI_TTS = 'gpt-4o-mini-tts',

    /** @deprecated Legacy model. Use GPT_4_O_MINI_TTS instead. */
    TTS_1 = 'tts-1',
    /** @deprecated Legacy model. Use GPT_4_O_MINI_TTS instead. */
    TTS_1_HD = 'tts-1-hd',
}

/** Models offered for a new selection, the first one is used as the default */
export const OPEN_AI_TTS_MODELS_ACTUAL: Array<OpenAiTtsModel> = [
    OpenAiTtsModel.GPT_4_O_MINI_TTS,
];

export enum OpenAiTtsVoice {
    ECHO = 'echo',
    ONYX = 'onyx',
    NOVA = 'nova',
    ALLOY = 'alloy',
    FABLE = 'fable',
    SHIMMER = 'shimmer',
}

export enum OpenAiTtsFormat {
    MP3 = 'mp3',
    AAC = 'aac',
    OPUS = 'opus',
    FLAC = 'flac',
}

export interface IOpenAiTtsModelDetails extends IOpenAiModelDetails<OpenAiTtsModel> {
    voices: Array<OpenAiTtsVoice>;
    formats: Array<OpenAiTtsFormat>;
}

export type IOpenAiTtsProgress = void;

export type IOpenAiTtsResponse = string;

export type IOpenAiTtsConsumption = number;

export const OPEN_AI_TTS_OPTIONS_SPEED_MIN = 0.25;
export const OPEN_AI_TTS_OPTIONS_SPEED_MAX = 4;