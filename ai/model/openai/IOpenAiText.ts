import { UnreachableStatementError } from "@ts-core/common";
import { IOpenAiModelDetails } from "./IOpenAiModel";
import { AiToolType } from "../../../ai";
import { IAiTextConsumption } from "../IAiTextConsumption";
import { IAiTextProgress } from "../IAiTextProgress";
import { IAiTextResponse } from "../IAiTextResponse";

export interface IOpenAiTextOptions {
    model: OpenAiTextModel;

    tools?: Array<AiToolType>;
    maxTokens?: number;
    temperature?: number;
    presencePenalty?: number;
    frequencyPenalty?: number;
}

export enum OpenAiTextModel {
    GPT_4 = 'gpt-4',
    GPT_4_1106_PREVIEW = 'gpt-4-1106-preview',
    GPT_4_0125_PREVIEW = 'gpt-4-0125-preview',
    GPT_4_VISION_PREVIEW = 'gpt-4-vision-preview',
    GPT_35_TURBO = 'gpt-3.5-turbo',
}

export type IOpenAiTextProgress = IAiTextProgress;

export type IOpenAiTextResponse = IAiTextResponse;

export type IOpenAiTextConsumption = IAiTextConsumption;

export interface IOpenAiTextModelDetails extends IOpenAiModelDetails<OpenAiTextModel> {
    tools: Array<AiToolType>;
}

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
        case OpenAiTextModel.GPT_4_0125_PREVIEW:
            return 128000;
        case OpenAiTextModel.GPT_4_VISION_PREVIEW:
            return 4096;
        default:
            throw new UnreachableStatementError(model);
    }
}