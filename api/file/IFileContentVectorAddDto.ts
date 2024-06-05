import { FileContentSplitterType, FileContentSplitterOptions } from '../../file';
import { IFileContentVectorAddTestDto } from './IFileContentVectorAddTestDto';

export interface IFileContentVectorAddDto extends IFileContentVectorAddTestDto {
    isRecognizeImages?: boolean;
}

export interface IFileContentSplitter {
    type: FileContentSplitterType;
    options?: FileContentSplitterOptions;
}
