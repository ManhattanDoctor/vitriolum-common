import { UnreachableStatementError } from "@ts-core/common";
import { IAnthropicModelDetails } from "./IAnthropicModel";
import { IAiTextConsumption } from "../IAiTextConsumption";
import { IAiTextOptions, IAiToolItem } from "../../../ai";
import { IAiTextProgress } from "../IAiTextProgress";
import { IAiTextResponse } from "../IAiTextResponse";

export interface IAnthropicTextOptions extends IAiTextOptions {
    model: AnthropicTextModel;
    /** Either an AiToolType value or an mcp server uid */
    tools?: Array<string>;
    topP?: number;
    topK?: number;
    maxTokens?: number;
    temperature?: number;
}

export enum AnthropicTextModel {
    CLAUDE_5_SONNET = 'claude-sonnet-5',
    CLAUDE_5_OPUS = 'claude-opus-5',

    CLAUDE_51_FABLE = 'claude-fable-5-1',
    CLAUDE_5_FABLE = 'claude-fable-5',

    CLAUDE_48_OPUS = 'claude-opus-4-8',
    CLAUDE_47_OPUS = 'claude-opus-4-7',
    CLAUDE_46_OPUS = 'claude-opus-4-6',
    CLAUDE_46_SONNET = 'claude-sonnet-4-6',

    CLAUDE_45_HAIKU = 'claude-haiku-4-5',

    /** @deprecated Previous generation. Use CLAUDE_5_OPUS instead. */
    CLAUDE_45_OPUS = 'claude-opus-4-5',
    /** @deprecated Previous generation. Use CLAUDE_5_SONNET instead. */
    CLAUDE_45_SONNET = 'claude-sonnet-4-5',
    /** @deprecated Deprecated since October 28, 2025. Use CLAUDE_5_SONNET instead. */
    CLAUDE_37_SONNET = 'claude-3-7-sonnet-20250219',
}

/** Models offered for a new selection, the first one is used as the default */
export const ANTHROPIC_TEXT_MODELS_ACTUAL: Array<AnthropicTextModel> = [
    AnthropicTextModel.CLAUDE_5_SONNET,
    AnthropicTextModel.CLAUDE_5_OPUS,
    AnthropicTextModel.CLAUDE_51_FABLE,
    AnthropicTextModel.CLAUDE_5_FABLE,
    AnthropicTextModel.CLAUDE_48_OPUS,
    AnthropicTextModel.CLAUDE_47_OPUS,
    AnthropicTextModel.CLAUDE_46_OPUS,
    AnthropicTextModel.CLAUDE_46_SONNET,
    AnthropicTextModel.CLAUDE_45_HAIKU,
];

export type IAnthropicTextProgress = IAiTextProgress;

export type IAnthropicTextResponse = IAiTextResponse;

export type IAnthropicTextConsumption = IAiTextConsumption;

export interface IAnthropicTextModelDetails extends IAnthropicModelDetails<AnthropicTextModel> {
    tools: Array<IAiToolItem>;
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
        // Claude 5 family and Claude 4.6+ support a 1M context window
        case AnthropicTextModel.CLAUDE_51_FABLE:
        case AnthropicTextModel.CLAUDE_5_FABLE:
        case AnthropicTextModel.CLAUDE_5_OPUS:
        case AnthropicTextModel.CLAUDE_5_SONNET:
        case AnthropicTextModel.CLAUDE_48_OPUS:
        case AnthropicTextModel.CLAUDE_47_OPUS:
        case AnthropicTextModel.CLAUDE_46_OPUS:
        case AnthropicTextModel.CLAUDE_46_SONNET:
            return 1_000_000;
        case AnthropicTextModel.CLAUDE_45_OPUS:
        case AnthropicTextModel.CLAUDE_45_HAIKU:
        case AnthropicTextModel.CLAUDE_45_SONNET:
        case AnthropicTextModel.CLAUDE_37_SONNET:
            return 200_000;
        default:
            throw new UnreachableStatementError(model);
    }
}

/**
 * Claude 5 family and Claude 4.7+ reject temperature, topP and topK with a 400 error,
 * use the model effort instead of the sampling parameters
 */
export function isSupportSampling(model: AnthropicTextModel): boolean {
    switch (model) {
        case AnthropicTextModel.CLAUDE_51_FABLE:
        case AnthropicTextModel.CLAUDE_5_FABLE:
        case AnthropicTextModel.CLAUDE_5_OPUS:
        case AnthropicTextModel.CLAUDE_5_SONNET:
        case AnthropicTextModel.CLAUDE_48_OPUS:
        case AnthropicTextModel.CLAUDE_47_OPUS:
            return false;
        default:
            return true;
    }
}


/**
 * Claude 5 family and Claude 4.6+ use adaptive thinking: the deprecated budget_tokens is
 * rejected and the Fable models return a 400 error when the thinking is explicitly disabled
 */
export function isSupportAdaptiveThinking(model: AnthropicTextModel): boolean {
    switch (model) {
        case AnthropicTextModel.CLAUDE_51_FABLE:
        case AnthropicTextModel.CLAUDE_5_FABLE:
        case AnthropicTextModel.CLAUDE_5_OPUS:
        case AnthropicTextModel.CLAUDE_5_SONNET:
        case AnthropicTextModel.CLAUDE_48_OPUS:
        case AnthropicTextModel.CLAUDE_47_OPUS:
        case AnthropicTextModel.CLAUDE_46_OPUS:
        case AnthropicTextModel.CLAUDE_46_SONNET:
            return true;
        default:
            return false;
    }
}

/** Default output budget for the models with the adaptive thinking, the reasoning shares it */
export const ANTHROPIC_TEXT_THINKING_MAX_TOKENS_DEFAULT = 16_000;
