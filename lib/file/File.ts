import { Type } from 'class-transformer';
import { FileBlob } from './FileBlob';

export class File {
    url: string;
    mime: string;
    blob?: FileBlob;
    extension: string;

    @Type(() => Date)
    createdDate: Date;

    @Type(() => Date)
    updatedDate: Date;
}
