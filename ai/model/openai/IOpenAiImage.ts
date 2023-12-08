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

export interface IOpenAiImageDalle2Details {
    sizes: Array<string>;
}
export interface IOpenAiImageDalle3Details {
    sizes: Array<string>;
    styles: Array<string>;
    qualities: Array<string>;
}
export type IOpenAiImageModelDetails = IOpenAiImageDalle2Details | IOpenAiImageDalle3Details

export type IOpenAiImageProgress = void;

export type IOpenAiImageResponse = Array<string>;

export type IOpenAiImageConsumption = number;

export const OPEN_AI_IMAGE_OPTIONS_N_MIN = 1;
export const OPEN_AI_IMAGE_OPTIONS_N_MAX = 4;
