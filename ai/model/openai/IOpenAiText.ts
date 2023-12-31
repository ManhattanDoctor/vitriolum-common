import { UnreachableStatementError } from "@ts-core/common";
import { IOpenAiModelDetails } from "./IOpenAiModel";

export interface IOpenAiTextOptions {
    model: OpenAiTextModel;
    maxTokens?: number;
    temperature?: number;
    presencePenalty?: number;
    frequencyPenalty?: number;
}

export enum OpenAiTextModel {
    GPT_4 = 'gpt-4',
    GPT_4_1106_PREVIEW = 'gpt-4-1106-preview',
    GPT_4_VISION_PREVIEW = 'gpt-4-vision-preview',
    GPT_35_TURBO = 'gpt-3.5-turbo',
}

export type IOpenAiTextProgress = string;

export interface IOpenAiTextResponse {
    role: string;
    content: string;
}

export interface IOpenAiTextConsumption {
    input: number;
    output: number;
}

export interface IOpenAiTextModelDetails extends IOpenAiModelDetails<OpenAiTextModel> { }

export const OPEN_AI_TEXT_OPTIONS_TEMPERATURE_MIN = 0;
export const OPEN_AI_TEXT_OPTIONS_TEMPERATURE_MAX = 2;

export const OPEN_AI_TEXT_OPTIONS_MAX_TOKENS_MIN = 0;
export const OPEN_AI_TEXT_OPTIONS_MAX_TOKENS_MAX = 1_000_000_000;

export const OPEN_AI_TEXT_OPTIONS_FREQUENCY_PENALTY_MIN = -2;
export const OPEN_AI_TEXT_OPTIONS_FREQUENCY_PENALTY_MAX = 2;

export const OPEN_AI_TEXT_OPTIONS_PRESENCE_PENALTY_MIN = -2;
export const OPEN_AI_TEXT_OPTIONS_PRESENCE_PENALTY_MAX = 2;

export function getMaxTokens(model: OpenAiTextModel): number {
    switch (model) {
        case OpenAiTextModel.GPT_4:
            return 8192;
        case OpenAiTextModel.GPT_35_TURBO:
            return 8192;
        case OpenAiTextModel.GPT_4_1106_PREVIEW:
            return 128000;
        case OpenAiTextModel.GPT_4_VISION_PREVIEW:
            return 4096;
        default:
            throw new UnreachableStatementError(model);
    }
}