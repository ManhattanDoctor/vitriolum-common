export enum AiTextModel {
    GPT_35_TURBO_16K = 'GPT_35_TURBO_16K'
}
export enum AiImageModel {
    STABLE_DIFFUSION = 'STABLE_DIFFUSION',
}

export type AiModel = AiTextModel | AiImageModel;