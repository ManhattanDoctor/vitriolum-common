import { ITraceable } from '@ts-core/common';
import { IFileContentSplitter } from './IFileContentVectorAddDto';

export interface IFileContentVectorTestDto extends ITraceable {
    id: number;
    splitter?: IFileContentSplitter;
}

export interface IFileContentVectorTestDtoResponse extends ITraceable {
    chunks: number;
    symbols: number;
    contents: Array<string>;
}