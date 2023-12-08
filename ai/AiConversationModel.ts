import { IOpenAiTextOptions, IOpenAiTextConsumption, IOpenAiTextModelDetails } from "./model/openai";

export enum AiConversationModel {
    OPEN_AI = 'OPEN_AI_CONVERSATION'
}

export type AiModelConversationOptions = IOpenAiTextOptions;
export type AiModelConversationDetails = IOpenAiTextModelDetails;
export type AiModelConversationConsumption = IOpenAiTextConsumption;
