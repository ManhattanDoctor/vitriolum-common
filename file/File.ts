import { Type } from 'class-transformer';
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
    userId: number;
    extension: string;

    vectorId?: number;
    openAiId?: string;

    @Type(() => Date)
    createdDate: Date;
}

export enum FileType {
    IMAGE = 'IMAGE',
    AUDIO = 'AUDIO',
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
}
export enum FileDocumentExtension {
    TXT = 'txt',
    PDF = 'pdf',
    DOC = 'doc',
    DOCX = 'docx',
    XLSX = 'xlsx',
}
export const FileImageExtensions: Array<string> = Object.values(FileImageExtension);
export const FileAudioExtensions: Array<string> = Object.values(FileAudioExtension);
export const FileDocumentExtensions: Array<string> = Object.values(FileDocumentExtension);
export const FileExtensions = [...FileImageExtensions, ...FileDocumentExtensions, ...FileAudioExtensions];
export type FileExtension = FileImageExtension | FileDocumentExtension | FileAudioExtension;

export enum FileImageMime {
    PNG = 'image/png',
    JPEG = 'image/jpeg',
}
export enum FileAudioMime {
    MP3 = 'audio/mpeg',
    AAC = 'audio/aac',
    OPUS = 'audio/opus',
    FLAC = 'audio/x-flac',
}
export enum FileDocumentMime {
    TXT = 'text/plain',
    PDF = 'application/pdf',
    DOC = 'application/msword',
    XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}
export const FileImageMimes: Array<string> = Object.values(FileImageMime);
export const FileAudioMimes: Array<string> = Object.values(FileAudioMime);
export const FileDocumentMimes: Array<string> = Object.values(FileDocumentMime);
export const FileMimes = [...FileImageMimes, ...FileDocumentMimes, ...FileAudioMimes];
export type FileMime = FileImageMime | FileDocumentMime | FileAudioMime;

export const FILE_SIZE_MAX = 10485760; // 10mb
export const FILE_AMOUNT_MAX = 50;
export const FILE_NAME_MAX_LENGTH = 124;
