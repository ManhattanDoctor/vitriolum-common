export interface IOpenAiImageDalle3Options {
    size: OpenAiImageDalle3Size;
    style: OpenAiImageDalle3Style;
    quality: OpenAiImageDalle3Quality;
}

export enum OpenAiImageDalle3Size {
    SIZE_1024 = '1024x1024',
    SIZE_1024_1792 = '1024x1792',
    SIZE_1792_1024 = '1792x1024',
}

export enum OpenAiImageDalle3Style {
    NATURAL = 'natural',
    VIVID = 'vivid',
}

export enum OpenAiImageDalle3Quality {
    STANDARD = 'standard',
    HD = 'hd',
}

export interface IOpenAiImageDalle3ModelDetails {
    sizes: Array<OpenAiImageDalle3Size>;
    styles: Array<OpenAiImageDalle3Style>;
    qualities: Array<OpenAiImageDalle3Quality>;
}