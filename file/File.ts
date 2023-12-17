import { Type } from 'class-transformer';
import { FileBlob } from './FileBlob';

export class File {
    id: number;
    uid: string;
    type: string;
    name: string;
    path: string;
    size: number;
    mime: string;
    hash: string;
    extension: string;

    userId: number;

    @Type(() => FileBlob)
    blob?: FileBlob;

    @Type(() => Date)
    createdDate: Date;
}

export const FilePictureExtensions = ['jpg', 'jpeg', 'png'];
