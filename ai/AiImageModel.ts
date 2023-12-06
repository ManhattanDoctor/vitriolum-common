import { IOpenAiImageModelDetails, IOpenAiImageOptions } from "./model/openai";
import { IStableImageOptions, IStableImageModelDetails } from "./model/stable";

export enum AiImageModel {
    STABLE = 'STABLE_IMAGE',
    OPEN_AI_DALLE_2 = 'OPEN_AI_IMAGE_DALLE_2',
    OPEN_AI_DALLE_3 = 'OPEN_AI_IMAGE_DALLE_3',
}

export type AiModelImageOptions = IOpenAiImageOptions | IStableImageOptions;
export type AiModelImageDetails = IOpenAiImageModelDetails | IStableImageModelDetails;