export interface IFileContentSearchOptions {
    maxDocuments: number;
    scoreThreshold: number;
}

export const FILE_CONTENT_SEARCH_MAX_DOCUMENTS_MIN = 1;
export const FILE_CONTENT_SEARCH_MAX_DOCUMENTS_MAX = 10;
export const FILE_CONTENT_SCORE_THRESHOLD_MIN = 0;
export const FILE_CONTENT_SCORE_THRESHOLD_MAX = 10;