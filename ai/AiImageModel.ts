import { IOpenAiImageModelDetails, IOpenAiImageOptions } from "./model/openai";
import { IStableImageOptions, IStableImageModelDetails } from "./model/stable";

export enum AiImageModel {
    STABLE_IMAGE = 'STABLE_IMAGE',
    OPEN_AI_IMAGE = 'OPEN_AI_IMAGE',
}

export type AiModelImageOptions = IOpenAiImageOptions | IStableImageOptions;
export type AiModelImageDetails = IOpenAiImageModelDetails | IStableImageModelDetails;