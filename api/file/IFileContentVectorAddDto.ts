import { ITraceable } from '@ts-core/common';
import { FileContentSplitterType, FileContentSplitterOptions } from '../../file';

export interface IFileContentVectorAddDto extends ITraceable {
    id: number;
    isTest?: boolean;
    splitter?: IFileContentSplitter;
}

export interface IFileContentVectorAddDtoResponse extends ITraceable {
    chunks: number;
    length: number;
}

export interface IFileContentSplitter {
    type: FileContentSplitterType;
    options?: FileContentSplitterOptions;
}
