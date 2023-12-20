import { ITraceable } from '@ts-core/common';
import { File } from '../../file';

export interface IFileAddDto extends ITraceable {
    description?: string;
}

export interface IFileBase64AddDto extends IFileAddDto {
    data: string;
    mime: string;
    name: string;
}

export type IFileAddDtoResponse = File;
