import { IOpenAiModelDetails } from "./IOpenAiModel";

export interface IOpenAiTtsOptions {
    model: string;
    voice: string;
    speed?: number;
    format?: string;
}

export interface IOpenAiTtsModelDetails extends IOpenAiModelDetails {
    voices: Array<string>;
    formats: Array<string>;
}

export const OPEN_AI_TTS_OPTIONS_VOICE_MIN_LENGTH = 0;
export const OPEN_AI_TTS_OPTIONS_VOICE_MAX_LENGTH = 16;

export const OPEN_AI_TTS_OPTIONS_MODEL_MIN_LENGTH = 4;
export const OPEN_AI_TTS_OPTIONS_MODEL_MAX_LENGTH = 128;

export const OPEN_AI_TTS_OPTIONS_FORMAT_MIN_LENGTH = 3;
export const OPEN_AI_TTS_OPTIONS_FORMAT_MAX_LENGTH = 12;

export const OPEN_AI_TTS_OPTIONS_SPEED_MIN = 0.25;
export const OPEN_AI_TTS_OPTIONS_SPEED_MAX = 4;