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
    id: number;
    chunks: number;
    symbols: number;
}

export type FileContentSplitterOptions = IFileContentCharacterSplitterOptions;