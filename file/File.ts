import { Type } from 'class-transformer';
import { User } from '../user';
import * as _ from 'lodash';

export class File {
    id: number;
    uid: string;
    type: FileType;
    name: string;
    path: string;
    size: number;
    mime: FileMime;
    hash: string;
    userId: number;
    extension: string;

    user?: User;
    vectorId?: number;

    @Type(() => Date)
    createdDate: Date;
}

export interface IFileInput {
    mime?: FileMime;
    source: string;
}

export const FILE_VECTOR_ID_LOADING = 0;

export enum FileType {
    IMAGE = 'IMAGE',
    AUDIO = 'AUDIO',
    VIDEO = 'VIDEO',
    DOCUMENT = 'DOCUMENT',
}

export enum FileImageExtension {
    PNG = 'png',
    JPG = 'jpg',
    JPEG = 'jpeg',
}
export enum FileAudioExtension {
    MP3 = 'mp3',
    AAC = 'aac',
    OPUS = 'opus',
    FLAC = 'flac',
    MPGA = 'mpga',
    WAV = 'wav',
}
export enum FileVideoExtension {
    MP4 = 'mp4',
    AVI = 'avi',
    WEBM = 'webm',
    MPEG = 'mpeg',
}
export enum FileDocumentExtension {
    TXT = 'txt',
    PDF = 'pdf',
    DOC = 'doc',
    DOCX = 'docx',
    XLSX = 'xlsx',
    JSON = 'json',
}
export type FileExtension = FileImageExtension | FileDocumentExtension | FileAudioExtension;
export const FileImageExtensions: Array<string> = Object.values(FileImageExtension);
export const FileAudioExtensions: Array<string> = Object.values(FileAudioExtension);
export const FileVideoExtensions: Array<string> = Object.values(FileVideoExtension);
export const FileDocumentExtensions: Array<string> = Object.values(FileDocumentExtension);

export const FileExtensions = [...FileImageExtensions, ...FileDocumentExtensions, ...FileAudioExtensions, ...FileVideoExtensions];
export const FileBinaryExtensions = [...FileImageExtensions, ...FileAudioExtensions, ...FileVideoExtensions];

export type FileTypes = FileType | Array<FileType>;
export type FileExtensions = FileExtension | Array<FileExtension>;

export enum FileImageMime {
    PNG = 'image/png',
    JPEG = 'image/jpeg',
}
export enum FileAudioMime {
    AAC = 'audio/aac',
    OPUS = 'audio/opus',
    FLAC = 'audio/x-flac',
    MPEG = 'audio/mpeg',
    WAV = 'audio/wav',
}
export enum FileVideoMime {
    MP4 = 'video/mp4',
    AVI = 'video/avi',
    WEBM = 'video/webm',
    MPEG = 'video/mpeg',
}

export enum FileDocumentMime {
    TXT = 'text/plain',
    PDF = 'application/pdf',
    DOC = 'application/msword',
    JSON = 'application/json',
    XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}
export const FileImageMimes: Array<string> = Object.values(FileImageMime);
export const FileAudioMimes: Array<string> = Object.values(FileAudioMime);
export const FileVideoMimes: Array<string> = Object.values(FileVideoMime);
export const FileDocumentMimes: Array<string> = Object.values(FileDocumentMime);
export const FileMimes = [...FileImageMimes, ...FileDocumentMimes, ...FileAudioMimes, ...FileVideoMimes];
export type FileMime = FileImageMime | FileDocumentMime | FileAudioMime | FileVideoMime;

export const FILE_SIZE_MAX = 1073741824; // 1000 Mb
export const FILE_AMOUNT_MAX = 100;

export const FILE_NAME_MIN_LENGTH = 3;
export const FILE_NAME_MAX_LENGTH = 124;
