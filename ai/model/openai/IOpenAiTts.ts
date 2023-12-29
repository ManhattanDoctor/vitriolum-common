import { IOpenAiModelDetails } from "./IOpenAiModel";

export interface IOpenAiTtsOptions {
    model: OpenAiTtsModel;
    voice: OpenAiTtsVoice;
    speed?: number;
    format?: string;
}

export enum OpenAiTtsModel {
    TTS_1 = 'tts-1',
    TTS_1_HD = 'tts-1-hd',
}

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