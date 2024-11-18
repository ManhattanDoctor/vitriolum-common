export interface ISpeechifyTtsOptions {
    voice: string;
    model?: SpeechifyTtsModel;
    speed?: number;
    format?: SpeechifyTtsFormat;
    language?: SpeechifyLanguage;
}

export enum SpeechifyLanguage {
    FRENCH = 'fr-FR',
    ENGLISH = 'en-US',
    SPANISH = 'es-ES',
}

export enum SpeechifyTtsModel {
    SIMBA_BASE = 'simba-base',
    SIMBA_TURBO = 'simba-turbo',
    SIMBA_ENGLISH = 'simba-english',
    SIMBA_MULTILINGUAL = 'simba-multilingual'
}

export enum SpeechifyTtsFormat {
    MP3 = 'mp3',
    WAV = 'wav',
    OGG = 'ogg',
    AAC = 'aac',
}

export interface ISpeechifyTtsModelDetails {
    voices: Array<string>;
    formats: Array<SpeechifyTtsFormat>;
}

export type ISpeechifyTtsProgress = void;

export type ISpeechifyTtsResponse = string;

export type ISpeechifyTtsConsumption = number;

export const SPEECHIFY_OPTIONS_INPUT_MAX_LENGTH = 2000;