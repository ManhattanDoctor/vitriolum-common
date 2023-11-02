export enum AiTextModel {
    GPT_35_TURBO_16K = 'GPT_35_TURBO_16K'
}
export enum AiImageModel {
    STABLE_DIFFUSION = 'STABLE_DIFFUSION',
}

export interface IAiModelTextOptions {
    temperature?: number;
}
export interface IAiModelImageOptions {
    width?: number;
    height?: number;
    model?: string;
    quality?: number;
    guidanceScale?: number;
}
export type AiModel = AiTextModel | AiImageModel;
export type AiModelOptions = IAiModelTextOptions | IAiModelImageOptions;