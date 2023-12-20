import { ITraceable } from '@ts-core/common';
import { File } from '../../file';

export interface IFileAddDto extends ITraceable {
    description?: string;
}

export interface IFileBufferAddDto extends IFileAddDto {
    name: string;
    mime: string;
    base64: string;
}

export type IFileAddDtoResponse = File;
