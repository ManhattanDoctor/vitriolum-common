import { ITraceable } from '@ts-core/common';
import { FileMime } from '../../file';
import { ToolConvertOptions } from '../../tool';

export interface IToolConvertDto extends ITraceable {
    to: FileMime;
    from: FileMime;
    source: string;
    options?: ToolConvertOptions;
}

export interface IToolConvertDtoResponse {
    mime: FileMime;
    source: string;
}