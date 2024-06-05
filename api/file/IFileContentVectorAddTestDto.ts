import { ITraceable } from '@ts-core/common';
import { IFileContentSplitter } from './IFileContentVectorAddDto';

export interface IFileContentVectorAddTestDto extends ITraceable {
    id: number;
    splitter?: IFileContentSplitter;
}

export interface IFileContentVectorAddTestDtoResponse extends ITraceable {
    chunks: number;
    symbols: number;
    contents: Array<string>;
}