import { UnreachableStatementError } from "@ts-core/common";
import { IGigaChatModelDetails } from "./IGigaChatModel";
import { AiTool } from "../../AiTool";

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

export type IGigaChatTextProgress = string;

export interface IGigaChatTextResponse {
    role: string;
    content: string;
}

export interface IGigaChatTextConsumption {
    input: number;
    output: number;
}

export interface IGigaChatTextModelDetails extends IGigaChatModelDetails<GigaChatTextModel> {
    tools: Array<AiTool>;
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