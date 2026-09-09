import { Voice } from "../../../voice";

export interface ISpeechifyTtsOptions {
    voice: string;
    model?: SpeechifyTtsModel;
    format?: SpeechifyTtsFormat;
    language?: SpeechifyTtsLanguage;
    isLoudnessNormalization?: boolean;
}

export enum SpeechifyTtsLanguage {
    FRENCH = 'fr-FR',
    ENGLISH = 'en-US',
    SPANISH = 'es-ES',
}

export enum SpeechifyTtsModel {
    SIMBA_30 = 'simba-3.0',
    SIMBA_32 = 'simba-3.2',

    /** @deprecated Retired from API version 2026-09-21, switched off on 2026-11-21. Use SIMBA_30 instead. */
    SIMBA_MULTILINGUAL = 'simba-multilingual',
    /** @deprecated Retired from API version 2026-09-21, switched off on 2026-11-21. Use SIMBA_32 instead. */
    SIMBA_ENGLISH = 'simba-english',
    /** @deprecated Legacy model. Use SIMBA_30 instead. */
    SIMBA_BASE = 'simba-base',
    /** @deprecated Legacy model. Use SIMBA_32 instead. */
    SIMBA_TURBO = 'simba-turbo',
}

/** Models offered for a new selection, the first one is used as the default */
export const SPEECHIFY_TTS_MODELS_ACTUAL: Array<SpeechifyTtsModel> = [
    SpeechifyTtsModel.SIMBA_30,
    SpeechifyTtsModel.SIMBA_32,
];

export enum SpeechifyTtsFormat {
    MP3 = 'mp3',
    WAV = 'wav',
    OGG = 'ogg',
    AAC = 'aac',
}

export interface ISpeechifyTtsModelDetails {
    models: Array<SpeechifyTtsModel>;
    voices: Array<Voice>;
    formats: Array<SpeechifyTtsFormat>;
    languages: Array<SpeechifyTtsLanguage>;
}

export type ISpeechifyTtsProgress = void;

export type ISpeechifyTtsResponse = string;

export type ISpeechifyTtsConsumption = number;

export const SPEECHIFY_OPTIONS_INPUT_MAX_LENGTH = 2000;