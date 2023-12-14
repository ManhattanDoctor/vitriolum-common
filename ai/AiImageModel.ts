import { IOpenAiImageConsumption, IOpenAiImageModelDetails, IOpenAiImageOptions } from "./model/openai";
import { IStableImageOptions, IStableImageModelDetails } from "./model/stable";

export enum AiImageModel {
    STABLE = 'STABLE_IMAGE',
    OPEN_AI_DALLE_2 = 'OPEN_AI_IMAGE_DALLE_2',
    OPEN_AI_DALLE_3 = 'OPEN_AI_IMAGE_DALLE_3',
}

export interface IAiImage {
    mime: string;
    width: number;
    height: number;
    source: string;
}

export type AiModelImageOptions = IOpenAiImageOptions | IStableImageOptions;
export type AiModelImageDetails = IOpenAiImageModelDetails | IStableImageModelDetails;
export type AiModelImageConsumption = IOpenAiImageConsumption;