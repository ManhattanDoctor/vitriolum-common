import { File } from '../../file';

export interface IFileEditDto extends Partial<File> {
    id: number;
    name?: string;
    tags?: Array<string>;
}

export type IFileEditDtoResponse = File;