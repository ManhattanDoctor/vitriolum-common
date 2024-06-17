import { IFileContentSplitter } from "../api/file";

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

export const FILE_CONTENT_SPLITTER_DEFAULT: IFileContentSplitter = { type: FileContentSplitterType.CHARACTER, options: { chunkSize: 1, chunkOverlap: 0, separator: '\n\n', keepSeparator: false } };
