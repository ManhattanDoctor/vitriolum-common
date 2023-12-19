import { Type } from 'class-transformer';
import { FileBlob } from './FileBlob';
import * as _ from 'lodash';

export class File {
    id: number;
    uid: string;
    type: FileType;
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

export enum FileImageExtension {
    PNG = 'png',
    JPG = 'jpg',
    JPEG = 'jpeg',
}
export enum FileDocumentExtension {
    PDF = 'png',
    XLS = 'xls',
    DOC = 'doc',
    DOCX = 'docx',
    XLSX = 'xlsx',
}
export const FileImageExtensions: Array<string> = Object.values(FileImageExtension);
export const FileDocumentExtensions: Array<string> = Object.values(FileDocumentExtension);

export const FileExtensions = [...FileImageExtensions, ...FileDocumentExtensions];

export const FileMimes = [
    'image/png',
    'image/jpeg',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
];

export enum FileType {
    IMAGE = 'IMAGE',
    DOCUMENT = 'DOCUMENT',
}

export const FILE_SIZE_MAX = 5242880; // 5mb
export const FILE_NAME_MAX_LENGTH = 124;
export const FILE_AMOUNT_MAX = 10;
