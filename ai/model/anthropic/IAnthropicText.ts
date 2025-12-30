import { UnreachableStatementError } from "@ts-core/common";
import { IAnthropicModelDetails } from "./IAnthropicModel";
import { IAiTextConsumption } from "../IAiTextConsumption";
import { AiToolType, IAiTextOptions } from "../../../ai";
import { IAiTextProgress } from "../IAiTextProgress";
import { IAiTextResponse } from "../IAiTextResponse";

export interface IAnthropicTextOptions extends IAiTextOptions {
    model: AnthropicTextModel;
    tools?: Array<AiToolType>;
    topP?: number;
    topK?: number;
    maxTokens?: number;
    temperature?: number;
}

export enum AnthropicTextModel {
    CLAUDE_45_OPUS = 'claude-opus-4-5',
    CLAUDE_45_HAIKU = 'claude-haiku-4-5',
    CLAUDE_45_SONNET = 'claude-sonnet-4-5',

    /** @deprecated Deprecated since October 28, 2025. Use CLAUDE_45_SONNET instead. */
    CLAUDE_37_SONNET = 'claude-3-7-sonnet-20250219',
    /** @deprecated Deprecated since August 13, 2025, retired October 28, 2025. Use CLAUDE_45_SONNET instead. */
    CLAUDE_35_SONNET = 'claude-3-5-sonnet-20241022',
}

export type IAnthropicTextProgress = IAiTextProgress;

export type IAnthropicTextResponse = IAiTextResponse;

export type IAnthropicTextConsumption = IAiTextConsumption;

export interface IAnthropicTextModelDetails extends IAnthropicModelDetails<AnthropicTextModel> {
    tools: Array<AiToolType>;
}

export const ANTHROPIC_TEXT_OPTIONS_TEMPERATURE_MIN = 0;
export const ANTHROPIC_TEXT_OPTIONS_TEMPERATURE_MAX = 2;

export const ANTHROPIC_TEXT_OPTIONS_MAX_TOKENS_MIN = 0;
export const ANTHROPIC_TEXT_OPTIONS_MAX_TOKENS_MAX = 1_000_000_000;

export const ANTHROPIC_TEXT_OPTIONS_TOP_P_MIN = 0;
export const ANTHROPIC_TEXT_OPTIONS_TOP_P_MAX = 1;

export const ANTHROPIC_TEXT_OPTIONS_TOP_K_MIN = 0;
export const ANTHROPIC_TEXT_OPTIONS_TOP_K_MAX = 1;

export function getMaxTokens(model: AnthropicTextModel): number {
    switch (model) {
        case AnthropicTextModel.CLAUDE_45_OPUS:
        case AnthropicTextModel.CLAUDE_45_HAIKU:
        case AnthropicTextModel.CLAUDE_37_SONNET:
        case AnthropicTextModel.CLAUDE_35_SONNET:
            return 200_000;
        case AnthropicTextModel.CLAUDE_45_SONNET:
            // Claude Sonnet 4.5 supports 200k standard or 1M (beta) context window
            // Currently returning standard 200k. For 1M context, use beta header.
            return 200_000;
        default:
            throw new UnreachableStatementError(model);
    }
}