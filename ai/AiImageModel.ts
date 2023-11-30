import { IStableImageOptions, IStableImageModelDetails } from "./model/stable";

export enum AiImageModel {
    STABLE_IMAGE = 'STABLE_IMAGE',
    OPEN_AI_IMAGE = 'OPEN_AI_IMAGE',
}

export type AiModelImageOptions = IStableImageOptions;
export type AiModelImageDetails = IStableImageModelDetails;