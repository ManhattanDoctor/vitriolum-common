import { IOpenAiTtsOptions, IOpenAiTtsModelDetails } from "./model/openai";
import { ISpeechifyTtsModelDetails, ISpeechifyTtsOptions } from "./model/speechify";

export enum AiTtsModel {
    OPEN_AI = 'OPEN_AI_TTS',
    SPEECHIFY = 'SPEECHIFY_TTS',
}

export type AiModelTtsOptions = IOpenAiTtsOptions | ISpeechifyTtsOptions;
export type AiModelTtsDetails  = IOpenAiTtsModelDetails | ISpeechifyTtsModelDetails;

