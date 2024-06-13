export enum FileContentSplitterType {
    AI = 'AI',
    CHARACTER = 'CHARACTER'
}

export interface IFileContentSplitResult {
    chunks: number;
    symbols: number;
    vectorId: number;
    contents: Array<string>;
}

export interface IFileContentCharacterSplitterOptions {
    separator?: string;
    chunkSize?: number;
    chunkOverlap?: number;
    keepSeparator?: boolean;
}

export type FileContentSplitterOptions = IFileContentCharacterSplitterOptions;