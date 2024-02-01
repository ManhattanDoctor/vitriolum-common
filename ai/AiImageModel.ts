import { IOpenAiImageConsumption, IOpenAiImageModelDetails, IOpenAiImageOptions } from "./model/openai";
import { IStableImageOptions, IStableImageModelDetails } from "./model/stable";
import { IGigaChatImageOptions, IGigaChatImageModelDetails, IGigaChatImageConsumption } from "./model/gigachat";

export enum AiImageModel {
    STABLE = 'STABLE_IMAGE',
    GIGA_CHAT = 'GIGA_CHAT_IMAGE',
    OPEN_AI_DALLE_2 = 'OPEN_AI_IMAGE_DALLE_2',
    OPEN_AI_DALLE_3 = 'OPEN_AI_IMAGE_DALLE_3',
}

export interface IAiImage {
    mime: string;
    width: number;
    height: number;
    source: string;
}

export type AiModelImageOptions = IOpenAiImageOptions | IStableImageOptions | IGigaChatImageOptions;
export type AiModelImageDetails = IOpenAiImageModelDetails | IStableImageModelDetails | IGigaChatImageModelDetails;
export type AiModelImageConsumption = IOpenAiImageConsumption | IGigaChatImageConsumption;