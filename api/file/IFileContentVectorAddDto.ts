import { FileContentSplitterType, FileContentSplitterOptions } from '../../file';
import { IFileContentVectorTestDto } from './IFileContentVectorTestDto';

export interface IFileContentVectorAddDto extends IFileContentVectorTestDto {
    isRecognizeImages?: boolean;
}

export interface IFileContentSplitter {
    type: FileContentSplitterType;
    options?: FileContentSplitterOptions;
}
