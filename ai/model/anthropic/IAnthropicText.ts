import { UnreachableStatementError } from "@ts-core/common";
import { IAnthropicModelDetails } from "./IAnthropicModel";
import { IAiTextConsumption } from "../IAiTextConsumption";
import { IAiTextProgress } from "../IAiTextProgress";
import { IAiTextResponse } from "../IAiTextResponse";
import { AiToolType } from "../../AiTool";

export interface IAnthropicTextOptions {
    model: AnthropicTextModel;
    tools?: Array<AiToolType>;
    topP?: number;
    topK?: number;
    maxTokens?: number;
    temperature?: number;
}

export enum AnthropicTextModel {
    CLAUDE_37_SONNET = 'claude-3-7-sonnet-20250219',
    CLAUDE_35_SONNET = 'claude-3-5-sonnet-20241022'
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
        case AnthropicTextModel.CLAUDE_35_SONNET:
            return 200_000;
        case AnthropicTextModel.CLAUDE_37_SONNET:
            return 1_000_000;
        default:
            throw new UnreachableStatementError(model);
    }
}