import { File } from "./File";

export interface IFileContentSearchOptions {
    files?: Array<FileSearchInfo>;
    scope?: FileContentSearchScope;
    isUseChunks?: boolean;
    isOnlyNotEmpty?: boolean;

    minScore: number;
    maxDocuments: number;
}

export enum FileContentSearchScope {
    ANY = 'ANY',
    BASE_ONLY = 'BASE_ONLY',
    FILES_ONLY = 'FILES_ONLY',
}

export type FileSearchInfo = number | File;

export const FILE_CONTENT_SEARCH_MAX_DOCUMENTS_MIN = 1;
export const FILE_CONTENT_SEARCH_MAX_DOCUMENTS_MAX = 1_000_000;
export const FILE_CONTENT_MIN_SCORE_MIN = 0;
export const FILE_CONTENT_MIN_SCORE_MAX = 1;