import { IOpenAiTextOptions, IOpenAiTextModelDetails } from "./model/openai";

export enum AiTextModel {
    OPEN_AI = 'OPEN_AI'
}

export type AiModelTextOptions = IOpenAiTextOptions;
export type AiModelTextDetails  = IOpenAiTextModelDetails;

export const AI_MODEL_TEXT_OPTIONS_TEMPERATURE_MIN = 0;
export const AI_MODEL_TEXT_OPTIONS_TEMPERATURE_MAX = 2;

export const AI_MODEL_TEXT_OPTIONS_MODEL_MIN_LENGTH = 4;
export const AI_MODEL_TEXT_OPTIONS_MODEL_MAX_LENGTH = 128;
