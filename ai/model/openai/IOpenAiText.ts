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
    /*
    GPT_5 = 'gpt-5',
    GPT_5_MINI = 'gpt-5-mini',
    */

    GPT_4_O = 'gpt-4o',
    GPT_4_1 = 'gpt-4.1',
    GPT_4_O_MINI = 'gpt-4o-mini',
    GPT_35_TURBO = 'gpt-3.5-turbo',
    GPT_4 = 'gpt-4',
    GPT_4_32K = 'gpt-4-32k',
    GPT_4_TURBO = 'gpt-4-turbo',
    GPT_4_TURBO_PREVIEW = 'gpt-4-turbo-preview',
    GPT_4_VISION_PREVIEW = 'gpt-4-vision-preview',

    O1 = 'o1',
    O1_MINI = 'o1-mini',

    O3 = 'o3',
    O3_MINI = 'o3-mini',
    O4_MINI = 'o4-mini',
    
    O1_PREVIEW = 'o1-preview',
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

export function isSupportStreaming(model: OpenAiTextModel): boolean {
    switch (model) {
        case OpenAiTextModel.O1_MINI:
        case OpenAiTextModel.O1_PREVIEW:
            return false;
        default:
            return true;
    }
}
export function getMaxTokens(model: OpenAiTextModel): number {
    switch (model) {
        case OpenAiTextModel.GPT_4:
            return 8192;
        case OpenAiTextModel.GPT_4_32K:
            return 32768;
        case OpenAiTextModel.GPT_35_TURBO:
            return 16385;
        case OpenAiTextModel.O1:
        case OpenAiTextModel.O1_MINI:
        case OpenAiTextModel.O3:
        case OpenAiTextModel.O3_MINI:
        case OpenAiTextModel.O4_MINI:
        case OpenAiTextModel.O1_PREVIEW:
        //case OpenAiTextModel.GPT_5:
        //case OpenAiTextModel.GPT_5_MINI:
        case OpenAiTextModel.GPT_4_O:
        case OpenAiTextModel.GPT_4_1:
        case OpenAiTextModel.GPT_4_O_MINI:
        case OpenAiTextModel.GPT_4_TURBO:
        case OpenAiTextModel.GPT_4_TURBO_PREVIEW:
        case OpenAiTextModel.GPT_4_VISION_PREVIEW:
            return 128000;
        default:
            throw new UnreachableStatementError(model);
    }
}