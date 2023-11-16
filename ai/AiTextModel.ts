import { IOpenAiTextOptions, IOpenAiTextModelDetails } from "./model/openai";

export enum AiTextModel {
    OPEN_AI = 'OPEN_AI_TEXT'
}

export type AiModelTextOptions = IOpenAiTextOptions;
export type AiModelTextDetails  = IOpenAiTextModelDetails;
