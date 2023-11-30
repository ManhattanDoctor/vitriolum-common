export interface IOpenAiModelDetails {
    models: Array<string>;
}

export interface IOpenAiTextModelDetails extends IOpenAiModelDetails { }

export interface IOpenAiImageModelDetails extends IOpenAiModelDetails {
    sizes: Array<string>;
    styles: Array<string>;
    qualities: Array<string>;
}

export interface IOpenAiTtsModelDetails extends IOpenAiModelDetails {
    voices: Array<string>;
    formats: Array<string>;
}

export interface IOpenAiSttModelDetails extends IOpenAiModelDetails {
    formats: Array<string>;
}