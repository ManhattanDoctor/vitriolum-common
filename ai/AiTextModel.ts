import { IOpenAiTextOptions, IOpenAiTextModelDetails, IOpenAiTextConsumption, IOpenAiTextProgress, IOpenAiTextResponse } from "./model/openai";
import { IGigaChatTextOptions, IGigaChatTextModelDetails, IGigaChatTextConsumption, IGigaChatTextProgress, IGigaChatTextResponse } from "./model/gigachat";
import { IAnthropicTextOptions, IAnthropicTextModelDetails, IAnthropicTextConsumption, IAnthropicTextProgress, IAnthropicTextResponse } from "./model/anthropic";
import { INostraTextOptions, INostraTextModelDetails, INostraTextConsumption, INostraTextProgress, INostraTextResponse } from "./model/nostra";

export enum AiTextModel {
    OPEN_AI = 'OPEN_AI_TEXT',
    GIGA_CHAT = 'GIGA_CHAT_TEXT',
    ANTHROPIC = 'ANTHROPIC_TEXT',
    NOSTRA = 'NOSTRA_TEXT',
}

export enum AiTextOutputFormat {
    PLAIN_EXTENDED = 'PLAIN_EXTENDED',
    PLAIN = 'PLAIN',
    HTML = 'HTML',
}

export interface IAiTextOptions {
    outputFormat?: string;
}

export type AiModelTextOptions = IOpenAiTextOptions | IGigaChatTextOptions | IAnthropicTextOptions | INostraTextOptions;
export type AiModelTextDetails = IOpenAiTextModelDetails | IGigaChatTextModelDetails | IAnthropicTextModelDetails | INostraTextModelDetails;
export type AiModelTextProgress = IOpenAiTextProgress | IGigaChatTextProgress | IAnthropicTextProgress | INostraTextProgress;
export type AiModelTextConsumption = IOpenAiTextConsumption | IGigaChatTextConsumption | IAnthropicTextConsumption | INostraTextConsumption;
export type AiModelTextResponse = IOpenAiTextResponse | IGigaChatTextResponse | IAnthropicTextResponse | INostraTextResponse;
