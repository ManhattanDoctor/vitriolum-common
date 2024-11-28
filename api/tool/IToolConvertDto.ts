import { ITraceable } from '@ts-core/common';
import { File, FileMime } from '../../file';
import { ToolConvertOptions } from '../../tool';

export interface IToolConvertDto extends ITraceable {
    to: FileMime;
    input: number | IToolConvertInput;
    options?: ToolConvertOptions;
}

export interface IToolConvertInput {
    mime?: FileMime;
    source: string;
}

export interface IToolConvertDtoResponse<T = File | string> {
    output: T;
}