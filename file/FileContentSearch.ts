export interface IFileContentSearchOptions {
    files?: Array<number>;
    minScore: number;
    maxDocuments: number;
}

export const FILE_CONTENT_SEARCH_MAX_DOCUMENTS_MIN = 1;
export const FILE_CONTENT_SEARCH_MAX_DOCUMENTS_MAX = 10;
export const FILE_CONTENT_MIN_SCORE_MIN = 0;
export const FILE_CONTENT_MIN_SCORE_MAX = 1;