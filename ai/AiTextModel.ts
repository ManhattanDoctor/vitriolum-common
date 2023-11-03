export enum AiTextModel {
    CHAT_GTP_4 = 'CHAT_GTP_4',
    CHAT_GTP_4_32K = 'CHAT_GTP_4_32K',
    CHAT_GTP_35 = 'CHAT_GTP_35',
    CHAT_GTP_35_16K = 'CHAT_GTP_35_16K',
}

export interface IAiModelTextOptions {
    temperature?: number;
}

export const AI_MODEL_TEXT_OPTIONS_TEMPERATURE_MIN = 0;
export const AI_MODEL_TEXT_OPTIONS_TEMPERATURE_MAX = 2;