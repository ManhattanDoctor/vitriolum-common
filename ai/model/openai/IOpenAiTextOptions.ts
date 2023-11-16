export interface IOpenAiTextOptions {
    model: string;
    temperature?: number;
    frequencyPenalty?: number;
}

export const OPEN_AI_TEXT_OPTIONS_TEMPERATURE_MIN = 0;
export const OPEN_AI_TEXT_OPTIONS_TEMPERATURE_MAX = 2;

export const OPEN_AI_TEXT_OPTIONS_MODEL_MIN_LENGTH = 4;
export const OPEN_AI_TEXT_OPTIONS_MODEL_MAX_LENGTH = 128;

export const OPEN_AI_TEXT_OPTIONS_FREQUENCY_PENALTY_MIN = -2;
export const OPEN_AI_TEXT_OPTIONS_FREQUENCY_PENALTY_MAX = 2;