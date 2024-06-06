import { IFileContentSearchOptions } from '../../file';

export interface IFileContentVectorSearchDto extends IFileContentSearchOptions {
    query: string;
    files?: Array<number>;
    userId?: number;
}

export interface IFileContentVectorSearchResult<T = any> {
    score: number;
    content: string;
    metadata: T;
}

export type IFileContentVectorSearchDtoResponse = Array<IFileContentVectorSearchResult>;