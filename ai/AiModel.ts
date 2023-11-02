export enum AiTextModel {
    GPT_4 = 'gpt-4',
    GPT_4_32K = 'gpt-4-32k',
    GPT_35_TURBO = 'gpt-3.5-turbo'
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