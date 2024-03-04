import { UnreachableStatementError } from "@ts-core/common";
import { IGigaChatModelDetails } from "./IGigaChatModel";
import { AiToolType } from "../../AiTool";
import { IAiTextConsumption } from "../IAiTextConsumption";
import { IAiTextProgress } from "../IAiTextProgress";
import { IAiTextResponse } from "../IAiTextResponse";

export interface IGigaChatTextOptions {
    model: GigaChatTextModel;
    topP?: number;
    maxTokens?: number;
    temperature?: number;
    repetitionPenalty?: number;
}

export enum GigaChatTextModel {
    LITE = 'GigaChat',
    PRO = 'GigaChat-Pro'
}

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
        case GigaChatTextModel.LITE:
            return 4096;
        case GigaChatTextModel.PRO:
            return 4096;
        default:
            throw new UnreachableStatementError(model);
    }
}