import { ITraceable } from '@ts-core/common';
import { FileContentSplitterType, FileContentSplitterOptions } from '../../file';

export interface IFileContentVectorAddDto extends ITraceable {
    id: number;
    splitter?: IFileContentSplitter;
    isRecognizeImages?: boolean;
}

export interface IFileContentVectorTestDtoResponse extends ITraceable {
    chunks: number;
    symbols: number;
}

export interface IFileContentSplitter {
    type: FileContentSplitterType;
    options?: FileContentSplitterOptions;
}
