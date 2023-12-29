import { IOpenAiModelDetails } from "./IOpenAiModel";

export interface IOpenAiTtsOptions {
    model: OpenAiTtsModel;
    voice: string;
    speed?: number;
    format?: string;
}

export enum OpenAiTtsModel {
    TTS_1 = 'tts-1',
    TTS_1_HD = 'tts-1-hd',
}

export interface IOpenAiTtsModelDetails extends IOpenAiModelDetails {
    voices: Array<string>;
    formats: Array<string>;
}

export type IOpenAiTtsProgress = void;

export type IOpenAiTtsResponse = string;

export type IOpenAiTtsConsumption = number;

export const OPEN_AI_TTS_OPTIONS_VOICE_MIN_LENGTH = 0;
export const OPEN_AI_TTS_OPTIONS_VOICE_MAX_LENGTH = 16;

export const OPEN_AI_TTS_OPTIONS_FORMAT_MIN_LENGTH = 3;
export const OPEN_AI_TTS_OPTIONS_FORMAT_MAX_LENGTH = 12;

export const OPEN_AI_TTS_OPTIONS_SPEED_MIN = 0.25;
export const OPEN_AI_TTS_OPTIONS_SPEED_MAX = 4;