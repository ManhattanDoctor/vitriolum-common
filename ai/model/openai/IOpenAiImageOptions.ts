export interface IOpenAiImageOptions {
    model: string;
    quality?: string;
    size?: string;
    style?: string;
    n?: number;
}

export const OPEN_AI_IMAGE_OPTIONS_MODEL_MIN_LENGTH = 4;
export const OPEN_AI_IMAGE_OPTIONS_MODEL_MAX_LENGTH = 128;

export const OPEN_AI_IMAGE_OPTIONS_QUALITY_MIN_LENGTH = 2;
export const OPEN_AI_IMAGE_OPTIONS_QUALITY_MAX_LENGTH = 32;

export const OPEN_AI_IMAGE_OPTIONS_SIZE_MIN_LENGTH = 2;
export const OPEN_AI_IMAGE_OPTIONS_SIZE_MAX_LENGTH = 32;

export const OPEN_AI_IMAGE_OPTIONS_STYLE_MIN_LENGTH = 2;
export const OPEN_AI_IMAGE_OPTIONS_STYLE_MAX_LENGTH = 32;
