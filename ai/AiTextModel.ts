import { IOpenAiTextOptions, IOpenAiTextModelDetails, IOpenAiTextConsumption, IOpenAiTextProgress, IOpenAiTextResponse } from "./model/openai";
import { IGigaChatTextOptions, IGigaChatTextModelDetails, IGigaChatTextConsumption, IGigaChatTextProgress, IGigaChatTextResponse } from "./model/gigachat";

export enum AiTextModel {
    OPEN_AI = 'OPEN_AI_TEXT',
    GIGA_CHAT = 'GIGA_CHAT_TEXT',
}

export type AiModelTextOptions = IOpenAiTextOptions | IGigaChatTextOptions;
export type AiModelTextDetails = IOpenAiTextModelDetails | IGigaChatTextModelDetails;
export type AiModelTextProgress = IOpenAiTextProgress | IGigaChatTextProgress;
export type AiModelTextConsumption = IOpenAiTextConsumption | IGigaChatTextConsumption;
export type AiModelTextResponse = IOpenAiTextResponse | IGigaChatTextResponse
