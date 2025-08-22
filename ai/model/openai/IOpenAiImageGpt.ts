export interface IOpenAiImageGptOptions {
    size: OpenAiImageGptSize;
    quality: OpenAiImageGptQuality;
    files?: Array<number>;
    background?: boolean;
    compression?: number;
}

export enum OpenAiImageGptSize {
    AUTO = 'auto',
    SIZE_1024 = '1024x1024',
    SIZE_1536_1024 = '1536x1024',
    SIZE_1024_1536 = '1024x1536',
}

export enum OpenAiImageGptQuality {
    AUTO = 'auto',
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export interface IOpenAiImageGptModelDetails {
    sizes: Array<OpenAiImageGptSize>;
    qualities: Array<OpenAiImageGptQuality>;
}