import { Type } from 'class-transformer';
import { FileBlob } from './FileBlob';
import * as _ from 'lodash';

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
export const FileDocumentExtensions = ['pdf', 'xlsx', 'xls', 'docx', 'doc'];
export const FileExtensions = [...FilePictureExtensions, ...FileDocumentExtensions];

export const FileMimes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
];
