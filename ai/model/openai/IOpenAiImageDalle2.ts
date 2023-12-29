export interface IOpenAiImageDalle2Options {
    size: OpenAiImageDalle2Size;
    n: number;
}
export enum OpenAiImageDalle2Size {
    SIZE_1024 = '1024x1024',
}
export interface IOpenAiImageDalle2ModelDetails {
    sizes: Array<OpenAiImageDalle2Size>;
}

export const OPEN_AI_IMAGE_DALLE2_OPTIONS_N_MIN = 1;
export const OPEN_AI_IMAGE_DALLE2_OPTIONS_N_MAX = 4;
