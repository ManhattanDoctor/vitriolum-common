import { ITraceable } from '@ts-core/common';
import { FileContentSplitterType, FileContentSplitterOptions } from '../../file';

export interface IFileContentVectorAddDto extends ITraceable {
    id: number;
    splitter?: IFileContentSplitter;
}

export interface IFileContentVectorAddTestDtoResponse extends ITraceable {
    chunks: number;
    symbols: number;
}

export interface IFileContentSplitter {
    type: FileContentSplitterType;
    options?: FileContentSplitterOptions;
}
