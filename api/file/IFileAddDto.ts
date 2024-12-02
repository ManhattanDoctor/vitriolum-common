import { ITraceable } from '@ts-core/common';
import { File, IFileInput } from '../../file';

export interface IFileAddDto extends ITraceable { }

export interface IFileBufferAddDto extends IFileAddDto {
    name: string;
    input: IFileInput;
    userId?: number;
}

export type IFileAddDtoResponse = File;
