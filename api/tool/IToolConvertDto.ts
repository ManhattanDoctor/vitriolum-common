import { ITraceable } from '@ts-core/common';
import { File, FileMime, IFileInput } from '../../file';
import { ToolConvertOptions } from '../../tool';

export interface IToolConvertDto extends ITraceable {
    to: FileMime;
    input: number | IFileInput;
    options?: ToolConvertOptions;
}

export interface IToolConvertDtoResponse<T = File | string> {
    output: T;
}