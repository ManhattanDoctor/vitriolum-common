import { IOpenAiModelDetails } from "./IOpenAiModel";

export interface IOpenAiTextOptions {
    model: string;
    temperature?: number;
    presencePenalty?: number;
    frequencyPenalty?: number;
}

export type IOpenAiTextProgress = string;

export type IOpenAiTextResponse = string;

export interface IOpenAiTextConsumption {
    input: number;
    output: number;
}

export interface IOpenAiTextModelDetails extends IOpenAiModelDetails { }

export const OPEN_AI_TEXT_OPTIONS_TEMPERATURE_MIN = 0;
export const OPEN_AI_TEXT_OPTIONS_TEMPERATURE_MAX = 2;

export const OPEN_AI_TEXT_OPTIONS_FREQUENCY_PENALTY_MIN = -2;
export const OPEN_AI_TEXT_OPTIONS_FREQUENCY_PENALTY_MAX = 2;

export const OPEN_AI_TEXT_OPTIONS_PRESENCE_PENALTY_MIN = -2;
export const OPEN_AI_TEXT_OPTIONS_PRESENCE_PENALTY_MAX = 2;