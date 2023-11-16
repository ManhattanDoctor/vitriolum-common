import { IOpenAiSttOptions, IOpenAiSttModelDetails } from "./model/openai";

export enum AiSttModel {
    OPEN_AI = 'OPEN_AI_STT'
}

export type AiModelSttOptions = IOpenAiSttOptions;
export type AiModelSttDetails  = IOpenAiSttModelDetails;

