import { IFileContentSearchOptions } from '../../file';

export interface IFileContentVectorSearchDto extends IFileContentSearchOptions {
    query: string;
    userId?: number;
}

export interface IFileContentVectorSearchResult {
    score: number;
    content: string;
    metadata: any;
}

export type IFileContentVectorSearchDtoResponse = Array<IFileContentVectorSearchResult>;