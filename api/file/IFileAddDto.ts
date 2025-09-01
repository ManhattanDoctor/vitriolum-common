import { ITraceable } from '@ts-core/common';
import { File, IFileInput } from '../../file';

interface IFileAddDto extends ITraceable {
    name: string;
    userId?: number;
    directory?: string;
}

export interface IFileLinkAddDto extends ITraceable {
    to: number;
    userId?: number;
    directory?: string;
}

export interface IFileDirectoryAddDto extends IFileAddDto { }

export interface IFileBufferAddDto extends IFileAddDto {
    input: IFileInput;
    tags?: Array<string>;
}

export type IFileAddDtoResponse = File;
