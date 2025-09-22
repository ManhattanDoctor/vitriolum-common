import { IOpenAiTextOptions, IOpenAiTextModelDetails, IOpenAiTextConsumption, IOpenAiTextProgress, IOpenAiTextResponse } from "./model/openai";
import { IGigaChatTextOptions, IGigaChatTextModelDetails, IGigaChatTextConsumption, IGigaChatTextProgress, IGigaChatTextResponse } from "./model/gigachat";
import { IAnthropicTextOptions, IAnthropicTextModelDetails, IAnthropicTextConsumption, IAnthropicTextProgress, IAnthropicTextResponse } from "./model/anthropic";

export enum AiTextModel {
    OPEN_AI = 'OPEN_AI_TEXT',
    GIGA_CHAT = 'GIGA_CHAT_TEXT',
    ANTHROPIC = 'ANTHROPIC_TEXT',
}

export enum AiTextOutputFormat {
    PLAIN_EXTENDED = 'PLAIN_EXTENDED',
    PLAIN = 'PLAIN',
    HTML = 'HTML',
}

export interface IAiTextOptions {
    outputFormat?: string;
}

export type AiModelTextOptions = IOpenAiTextOptions | IGigaChatTextOptions | IAnthropicTextOptions;
export type AiModelTextDetails = IOpenAiTextModelDetails | IGigaChatTextModelDetails | IAnthropicTextModelDetails;
export type AiModelTextProgress = IOpenAiTextProgress | IGigaChatTextProgress | IAnthropicTextProgress;
export type AiModelTextConsumption = IOpenAiTextConsumption | IGigaChatTextConsumption | IAnthropicTextConsumption;
export type AiModelTextResponse = IOpenAiTextResponse | IGigaChatTextResponse | IAnthropicTextResponse;
