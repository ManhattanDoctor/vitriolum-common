export enum FileContentSplitterType {
    AI = 'AI',
    CHARACTER = 'CHARACTER'
}

export interface IFileContentCharacterSplitterOptions {
    separator?: string;
    chunkSize?: number;
    chunkOverlap?: number;
    keepSeparator?: boolean;
}

export interface FileContentSplitResult {
    chunks: number;
    symbols: number;
    vectorId: number;
    contents: Array<string>;
}

export type FileContentSplitterOptions = IFileContentCharacterSplitterOptions;