import { File } from '../../file';

export interface IFileEditDto {
    id: number;
    name?: string;
}

export type IFileEditDtoResponse = File;