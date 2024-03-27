export enum FileContentSplitterType {
    AI = 'AI',
    CHARACTER = 'CHARACTER'
}

export interface IFileContentCharacterSplitterOptions {
    separator?: string;
    chunkSize?: number;
    chunkOverlap?: number;
}

export type FileContentSplitterOptions = IFileContentCharacterSplitterOptions;