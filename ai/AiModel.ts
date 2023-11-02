export enum AiTextModel {
    CHAT_GTP_4 = 'CHAT_GTP_4',
    CHAT_GTP_4_32K = 'CHAT_GTP_4_32K',
    CHAT_GTP_35 = 'CHAT_GTP_35',
    CHAT_GTP_35_16K = 'CHAT_GTP_35_16K',
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