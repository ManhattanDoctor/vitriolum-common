import { ITraceable } from '@ts-core/common';

export interface IFileContentVectorGetDtoResponse extends ITraceable {
    chunks: number;
    contents: Array<string>;
}