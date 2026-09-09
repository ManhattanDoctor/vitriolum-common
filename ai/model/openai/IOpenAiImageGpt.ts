export interface IOpenAiImageGptOptions {
    model: OpenAiImageGptModel;
    size?: OpenAiImageGptSize;
    quality?: OpenAiImageGptQuality;
    background?: OpenAiImageGptBackground;
    compression?: number;
}

export enum OpenAiImageGptModel {
    GPT_IMAGE_2 = 'gpt-image-2',
    GPT_IMAGE_5 = 'gpt-image-1.5',
    GPT_IMAGE_1_MINI = 'gpt-image-1-mini',

    /** @deprecated Superseded by GPT_IMAGE_2. */
    GPT_IMAGE_1 = 'gpt-image-1',
}

/** Models offered for a new selection, the first one is used as the default */
export const OPEN_AI_IMAGE_GPT_MODELS_ACTUAL: Array<OpenAiImageGptModel> = [
    OpenAiImageGptModel.GPT_IMAGE_2,
    OpenAiImageGptModel.GPT_IMAGE_5,
    OpenAiImageGptModel.GPT_IMAGE_1_MINI,
];

export enum OpenAiImageGptSize {
    SIZE_1024 = '1024x1024',
    SIZE_1536_1024 = '1536x1024',
    SIZE_1024_1536 = '1024x1536',
}

export enum OpenAiImageGptQuality {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export enum OpenAiImageGptBackground {
    TRANSPARENT = 'transparent',
    OPAQUE = 'opaque',
}

export interface IOpenAiImageGptModelDetails {
    sizes: Array<OpenAiImageGptSize>;
    models: Array<OpenAiImageGptModel>;
    qualities: Array<OpenAiImageGptQuality>;
    backgrounds: Array<OpenAiImageGptBackground>;
}