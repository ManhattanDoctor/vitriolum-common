import { FileContentSplitterType, FileContentSplitterOptions } from '../../file';
import { IFileContentVectorSplitDto } from './IFileContentVectorSplitDto';

export interface IFileContentVectorAddDto extends IFileContentVectorSplitDto {
    isRecognizeImages?: boolean;
}

export interface IFileContentSplitter {
    type: FileContentSplitterType;
    options?: FileContentSplitterOptions;
}
