import { ITraceable } from '@ts-core/common';
import { IFileContentSplitter } from './IFileContentVectorAddDto';

export interface IFileContentVectorSplitDto extends ITraceable {
    id: number;
    splitter?: IFileContentSplitter;
}

export interface IFileContentVectorSplitDtoResponse extends ITraceable {
    chunks: number;
    symbols: number;
    contents: Array<string>;
}