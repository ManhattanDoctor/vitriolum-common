import { UnreachableStatementError } from "@ts-core/common";
import { IOpenAiModelDetails } from "./IOpenAiModel";
import { IAiTextOptions, IAiToolItem } from "../../../ai";
import { IAiTextConsumption } from "../IAiTextConsumption";
import { IAiTextProgress } from "../IAiTextProgress";
import { IAiTextResponse } from "../IAiTextResponse";

export interface IOpenAiTextOptions extends IAiTextOptions {
    model: OpenAiTextModel;
    /** Either an AiToolType value or an mcp server uid */
    tools?: Array<string>;
    maxTokens?: number;
    temperature?: number;
    presencePenalty?: number;
    frequencyPenalty?: number;
}

export enum OpenAiTextModel {
    GPT_56_TERRA = 'gpt-5.6-terra',
    GPT_56_SOL = 'gpt-5.6-sol',
    GPT_56_LUNA = 'gpt-5.6-luna',

    GPT_6_ASTRA = 'gpt-6-astra',

    GPT_55 = 'gpt-5.5',
    GPT_55_PRO = 'gpt-5.5-pro',

    GPT_54 = 'gpt-5.4',
    GPT_54_MINI = 'gpt-5.4-mini',
    GPT_54_NANO = 'gpt-5.4-nano',

    GPT_5 = 'gpt-5',
    GPT_5_1 = 'gpt-5.1',
    GPT_5_2 = 'gpt-5.2',
    GPT_5_MINI = 'gpt-5-mini',

    GPT_4_O = 'gpt-4o',
    GPT_4_O_MINI = 'gpt-4o-mini',

    O1 = 'o1',
    O3 = 'o3',
    O3_MINI = 'o3-mini',

    /** @deprecated Deprecated since February 13, 2025. */
    GPT_35_TURBO = 'gpt-3.5-turbo',
    /** @deprecated Superseded by GPT_54_NANO. */
    GPT_5_NANO = 'gpt-5-nano',
    /** @deprecated Superseded by GPT_56_TERRA. */
    GPT_4_1 = 'gpt-4.1',
    /** @deprecated Deprecated since June 6, 2025. Use GPT_4_O instead. */
    GPT_4 = 'gpt-4',
    /** @deprecated Superseded by GPT_4_O. */
    GPT_4_TURBO = 'gpt-4-turbo',
    /** @deprecated Superseded by O3_MINI. */
    O1_MINI = 'o1-mini',
    /** @deprecated Superseded by O3_MINI. */
    O4_MINI = 'o4-mini',
    /** @deprecated Deprecated since July 28, 2025. Use O1 instead. */
    O1_PREVIEW = 'o1-preview',
    /** @deprecated Deprecated since June 6, 2025. Use gpt-4-turbo or gpt-4o instead. */
    GPT_4_32K = 'gpt-4-32k',
    /** @deprecated Preview version. Use gpt-4-turbo instead. */
    GPT_4_TURBO_PREVIEW = 'gpt-4-turbo-preview',
    /** @deprecated Deprecated since June 6, 2024. Use gpt-4o or gpt-4-turbo for vision capabilities. */
    GPT_4_VISION_PREVIEW = 'gpt-4-vision-preview',
}

/** Models offered for a new selection, the first one is used as the default */
export const OPEN_AI_TEXT_MODELS_ACTUAL: Array<OpenAiTextModel> = [
    OpenAiTextModel.GPT_56_TERRA,
    OpenAiTextModel.GPT_56_SOL,
    OpenAiTextModel.GPT_56_LUNA,
    OpenAiTextModel.GPT_6_ASTRA,
    OpenAiTextModel.GPT_55,
    OpenAiTextModel.GPT_55_PRO,
    OpenAiTextModel.GPT_54,
    OpenAiTextModel.GPT_54_MINI,
    OpenAiTextModel.GPT_54_NANO,
    OpenAiTextModel.GPT_5,
    OpenAiTextModel.GPT_5_1,
    OpenAiTextModel.GPT_5_2,
    OpenAiTextModel.GPT_5_MINI,
    OpenAiTextModel.GPT_4_O,
    OpenAiTextModel.GPT_4_O_MINI,
    OpenAiTextModel.O1,
    OpenAiTextModel.O3,
    OpenAiTextModel.O3_MINI,
];

export type IOpenAiTextProgress = IAiTextProgress;

export type IOpenAiTextResponse = IAiTextResponse;

export type IOpenAiTextConsumption = IAiTextConsumption;

export interface IOpenAiTextModelDetails extends IOpenAiModelDetails<OpenAiTextModel> {
    tools: Array<IAiToolItem>;
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
            return 8_192;
        case OpenAiTextModel.GPT_4_32K:
            return 32_768;
        case OpenAiTextModel.GPT_35_TURBO:
            return 16_385;
        // GPT-6 and GPT-5.4+ ship a 1.05M context window
        case OpenAiTextModel.GPT_6_ASTRA:
        case OpenAiTextModel.GPT_56_SOL:
        case OpenAiTextModel.GPT_56_TERRA:
        case OpenAiTextModel.GPT_56_LUNA:
        case OpenAiTextModel.GPT_55:
        case OpenAiTextModel.GPT_55_PRO:
        case OpenAiTextModel.GPT_54:
        case OpenAiTextModel.GPT_54_MINI:
        case OpenAiTextModel.GPT_54_NANO:
            return 1_050_000;
        case OpenAiTextModel.GPT_4_1:
            return 1_000_000;
        case OpenAiTextModel.GPT_5:
        case OpenAiTextModel.GPT_5_1:
        case OpenAiTextModel.GPT_5_2:
        case OpenAiTextModel.GPT_5_NANO:
        case OpenAiTextModel.GPT_5_MINI:
            return 400_000;
        case OpenAiTextModel.O3:
        case OpenAiTextModel.O3_MINI:
        case OpenAiTextModel.O4_MINI:
            return 200_000;
        case OpenAiTextModel.O1:
        case OpenAiTextModel.O1_MINI:
        case OpenAiTextModel.O1_PREVIEW:
        case OpenAiTextModel.GPT_4_O:
        case OpenAiTextModel.GPT_4_O_MINI:
        case OpenAiTextModel.GPT_4_TURBO:
        case OpenAiTextModel.GPT_4_TURBO_PREVIEW:
        case OpenAiTextModel.GPT_4_VISION_PREVIEW:
            return 128_000;
        default:
            throw new UnreachableStatementError(model);
    }
}

/**
 * Reasoning models (GPT-5 family and newer, o-series) reject temperature, topP,
 * presencePenalty and frequencyPenalty with a 400 error
 */
export function isSupportSampling(model: OpenAiTextModel): boolean {
    switch (model) {
        case OpenAiTextModel.GPT_6_ASTRA:
        case OpenAiTextModel.GPT_56_SOL:
        case OpenAiTextModel.GPT_56_TERRA:
        case OpenAiTextModel.GPT_56_LUNA:
        case OpenAiTextModel.GPT_55:
        case OpenAiTextModel.GPT_55_PRO:
        case OpenAiTextModel.GPT_54:
        case OpenAiTextModel.GPT_54_MINI:
        case OpenAiTextModel.GPT_54_NANO:
        case OpenAiTextModel.GPT_5:
        case OpenAiTextModel.GPT_5_1:
        case OpenAiTextModel.GPT_5_2:
        case OpenAiTextModel.GPT_5_MINI:
        case OpenAiTextModel.GPT_5_NANO:
        case OpenAiTextModel.O1:
        case OpenAiTextModel.O1_MINI:
        case OpenAiTextModel.O1_PREVIEW:
        case OpenAiTextModel.O3:
        case OpenAiTextModel.O3_MINI:
        case OpenAiTextModel.O4_MINI:
            return false;
        default:
            return true;
    }
}
