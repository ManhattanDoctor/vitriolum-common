import { IStableImageOptions, IStableImageModelDetails } from "./model/stable";

export enum AiImageModel {
    STABLE = 'STABLE_IMAGE',
}

export type AiModelImageOptions = IStableImageOptions;
export type AiModelImageDetails = IStableImageModelDetails;