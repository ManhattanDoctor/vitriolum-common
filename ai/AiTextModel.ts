import { IOpenAiTextOptions, IOpenAiTextModelDetails, IOpenAiTextConsumption } from "./model/openai";
import { IGigaChatTextOptions, IGigaChatTextModelDetails, IGigaChatTextConsumption } from "./model/gigachat";

export enum AiTextModel {
    OPEN_AI = 'OPEN_AI_TEXT',
    GIGA_CHAT = 'GIGA_CHAT_TEXT',
}

export type AiModelTextOptions = IOpenAiTextOptions | IGigaChatTextOptions;
export type AiModelTextDetails = IOpenAiTextModelDetails | IGigaChatTextModelDetails;
export type AiModelTextConsumption = IOpenAiTextConsumption | IGigaChatTextConsumption;
