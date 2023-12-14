import { IAiImage } from "../../AiImageModel";

export interface IOpenAiImageDalle2Options {
    size: string;
    n: number;
}
export interface IOpenAiImageDalle3Options {
    size: string;
    style: string;
    quality: string;
}
export type IOpenAiImageOptions = IOpenAiImageDalle2Options | IOpenAiImageDalle3Options;

export interface IOpenAiImageDalle2ModelDetails {
    sizes: Array<string>;
}
export interface IOpenAiImageDalle3ModelDetails {
    sizes: Array<string>;
    styles: Array<string>;
    qualities: Array<string>;
}
export type IOpenAiImageModelDetails = IOpenAiImageDalle2ModelDetails | IOpenAiImageDalle3ModelDetails

export type IOpenAiImageProgress = void;

export type IOpenAiImageResponse = Array<IAiImage>;

export type IOpenAiImageConsumption = number;

export const OPEN_AI_IMAGE_OPTIONS_N_MIN = 1;
export const OPEN_AI_IMAGE_OPTIONS_N_MAX = 4;
