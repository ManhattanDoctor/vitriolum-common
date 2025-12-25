export interface IOpenAiImageGptOptions {
    model: OpenAiImageGptModel;
    size?: OpenAiImageGptSize;
    quality?: OpenAiImageGptQuality;
    background?: OpenAiImageGptBackground;
    compression?: number;
}

export enum OpenAiImageGptModel {
    GPT_IMAGE_1 = 'gpt-image-1',
    GPT_IMAGE_5 = 'gpt-image-1.5',
    GPT_IMAGE_1_MINI = 'gpt-image-1-mini',
}

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
    AUTO = 'auto',
    TRANSPARENT = 'transparent',
    OPAQUE = 'opaque',
}

export interface IOpenAiImageGptModelDetails {
    sizes: Array<OpenAiImageGptSize>;
    models: Array<OpenAiImageGptModel>;
    qualities: Array<OpenAiImageGptQuality>;
    backgrounds: Array<OpenAiImageGptBackground>;
}