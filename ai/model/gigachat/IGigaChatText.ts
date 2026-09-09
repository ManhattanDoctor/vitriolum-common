import { UnreachableStatementError } from "@ts-core/common";
import { IGigaChatModelDetails } from "./IGigaChatModel";
import { AiToolType, IAiTextOptions } from "../../../ai";
import { IAiTextConsumption } from "../IAiTextConsumption";
import { IAiTextProgress } from "../IAiTextProgress";
import { IAiTextResponse } from "../IAiTextResponse";

export interface IGigaChatTextOptions extends IAiTextOptions {
    model: GigaChatTextModel;
    topP?: number;
    tools?: Array<AiToolType>;
    maxTokens?: number;
    temperature?: number;
    repetitionPenalty?: number;
}

export enum GigaChatTextModel {
    LITE = 'GigaChat-2',
    PRO = 'GigaChat-2-Pro',
    MAX = 'GigaChat-2-Max',

    /** @deprecated First generation, requests are redirected to GigaChat-2. */
    LITE_LEGACY = 'GigaChat',
    /** @deprecated First generation, requests are redirected to GigaChat-2-Pro. */
    PRO_LEGACY = 'GigaChat-Pro',
    /** @deprecated First generation, requests are redirected to GigaChat-2-Max. */
    MAX_LEGACY = 'GigaChat-Max',
}

/** Models offered for a new selection, the first one is used as the default */
export const GIGA_CHAT_TEXT_MODELS_ACTUAL: Array<GigaChatTextModel> = [
    GigaChatTextModel.LITE,
    GigaChatTextModel.PRO,
    GigaChatTextModel.MAX,
];

export type IGigaChatTextProgress = IAiTextProgress;

export type IGigaChatTextResponse = IAiTextResponse;

export type IGigaChatTextConsumption = IAiTextConsumption;

export interface IGigaChatTextModelDetails extends IGigaChatModelDetails<GigaChatTextModel> {
    tools: Array<AiToolType>;
}

export const GIGA_CHAT_TEXT_OPTIONS_TEMPERATURE_MIN = 0;
export const GIGA_CHAT_TEXT_OPTIONS_TEMPERATURE_MAX = 2;

export const GIGA_CHAT_TEXT_OPTIONS_MAX_TOKENS_MIN = 0;
export const GIGA_CHAT_TEXT_OPTIONS_MAX_TOKENS_MAX = 1_000_000_000;

export const GIGA_CHAT_TEXT_OPTIONS_TOP_P_MIN = 0;
export const GIGA_CHAT_TEXT_OPTIONS_TOP_P_MAX = 1;

export const GIGA_CHAT_TEXT_OPTIONS_REPETITION_PENALTY_MIN = 0;
export const GIGA_CHAT_TEXT_OPTIONS_REPETITION_PENALTY_MAX = 2;

export function getMaxTokens(model: GigaChatTextModel): number {
    switch (model) {
        // GigaChat 2 models share a 128k context window
        case GigaChatTextModel.LITE:
        case GigaChatTextModel.PRO:
        case GigaChatTextModel.MAX:
            return 128_000;
        case GigaChatTextModel.LITE_LEGACY:
        case GigaChatTextModel.PRO_LEGACY:
        case GigaChatTextModel.MAX_LEGACY:
            return 4096;
        default:
            throw new UnreachableStatementError(model);
    }
}