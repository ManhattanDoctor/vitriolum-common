import { IOpenAiImageModelDetails, IOpenAiImageOptions } from "./model/openai";
import { IStableImageOptions, IStableImageModelDetails } from "./model/stable";

export enum AiImageModel {
    STABLE = 'STABLE_IMAGE',
    OPEN_AI = 'OPEN_AI_IMAGE',
}

export type AiModelImageOptions = IOpenAiImageOptions | IStableImageOptions;
export type AiModelImageDetails = IOpenAiImageModelDetails | IStableImageModelDetails;