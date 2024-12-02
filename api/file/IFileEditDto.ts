import { File } from '../../file';

export interface IFileEditDto extends Partial<File> {
    id: number;
    name?: string;
}

export type IFileEditDtoResponse = File;