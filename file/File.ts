import { Type } from 'class-transformer';
import { User } from '../user';
import { ApiProperty, ApiPropertyOptional } from '@ts-core/swagger';
import * as _ from 'lodash';

export enum FileType {
    IMAGE = 'IMAGE',
    AUDIO = 'AUDIO',
    VIDEO = 'VIDEO',
    LINK = 'LINK',
    DOCUMENT = 'DOCUMENT',
    DIRECTORY = 'DIRECTORY',
}

export class File {
    @ApiProperty({ description: 'File ID' })
    public id: number;

    @ApiProperty({ description: 'File unique identifier' })
    public uid: string;

    @ApiProperty({ description: 'File type', enum: FileType })
    public type: FileType;

    @ApiProperty({ description: 'File name' })
    public name: string;

    @ApiProperty({ description: 'File path' })
    public path: string;

    @ApiProperty({ description: 'File size in bytes' })
    public size: number;

    @ApiProperty({ description: 'File MIME type', type: 'string' })
    public mime: FileMime;

    @ApiProperty({ description: 'File hash' })
    public hash: string;

    @ApiProperty({ description: 'Owner user ID' })
    public userId: number;

    @ApiProperty({ description: 'File extension' })
    public extension: string;

    @ApiPropertyOptional({ description: 'Link target file ID' })
    public linkTo?: number;

    @ApiPropertyOptional({ description: 'Directory path' })
    public directory?: string;

    public user?: User;

    @ApiPropertyOptional({ description: 'File tags', type: [String] })
    public tags?: Array<string>;

    @ApiPropertyOptional({ description: 'Vector store ID' })
    public vectorId?: number;

    @ApiProperty({ description: 'Creation date', type: Date })
    @Type(() => Date)
    public createdDate: Date;
}

export interface IFileInput {
    mime?: FileMime;
    source: string;
}

export const FILE_VECTOR_ID_LOADING = 0;
export const FILE_PARENT_DIRECTORY_ID = Number.MAX_SAFE_INTEGER;

export function IsParentDirectory(item: File): boolean {
    return item?.id === FILE_PARENT_DIRECTORY_ID;
}

export enum FileImageExtension {
    PNG = 'png',
    JPG = 'jpg',
    JPEG = 'jpeg',
}
export enum FileAudioExtension {
    MP3 = 'mp3',
    AAC = 'aac',
    WAV = 'wav',
    OPUS = 'opus',
    FLAC = 'flac',
    MPGA = 'mpga',
    M4A = 'm4a',
}
export enum FileVideoExtension {
    MP4 = 'mp4',
    AVI = 'avi',
    WEBM = 'webm',
    MPEG = 'mpeg',
}
export enum FileDocumentExtension {
    TXT = 'txt',
    MD = 'md',
    PDF = 'pdf',
    DOC = 'doc',
    DOCX = 'docx',
    XLSX = 'xlsx',
    JSON = 'json',
}
export type FileExtension = FileImageExtension | FileDocumentExtension | FileAudioExtension;
export const FileSystemExtensions: Array<string> = new Array<string>();
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
    M4A = 'audio/mp4',
}
export enum FileVideoMime {
    MP4 = 'video/mp4',
    AVI = 'video/avi',
    WEBM = 'video/webm',
    MPEG = 'video/mpeg',
}

export enum FileDocumentMime {
    TXT = 'text/plain',
    MD = 'text/markdown',
    PDF = 'application/pdf',
    DOC = 'application/msword',
    JSON = 'application/json',
    XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}
export enum FileSystemMime {
    LINK = 'link/link',
    DIRECTORY = 'directory/directory',
}
export const FileImageMimes: Array<string> = Object.values(FileImageMime);
export const FileAudioMimes: Array<string> = Object.values(FileAudioMime);
export const FileVideoMimes: Array<string> = Object.values(FileVideoMime);
export const FileSystemMimes: Array<string> = Object.values(FileSystemMime);
export const FileDocumentMimes: Array<string> = Object.values(FileDocumentMime);
export const FileMimes = [...FileImageMimes, ...FileDocumentMimes, ...FileAudioMimes, ...FileVideoMimes, ...FileSystemMimes];
export type FileMime = FileImageMime | FileDocumentMime | FileAudioMime | FileVideoMime | FileSystemMime;

/**
 * Другие названия тех же форматов, которые присылают браузеры и системы: mime берётся у браузера как есть,
 * и m4a с Mac приходит как audio/x-m4a, а FLAC из Chrome — как audio/flac. При сохранении название
 * приводится к основному (FileUtil.normalizeMime), поэтому в базе и дальше по коду живут только основные
 */
export const FileMimeAliases: Record<string, FileMime> = {
    'image/jpg': FileImageMime.JPEG,
    'audio/mp3': FileAudioMime.MPEG,
    'audio/x-wav': FileAudioMime.WAV,
    'audio/wave': FileAudioMime.WAV,
    'audio/flac': FileAudioMime.FLAC,
    'audio/x-m4a': FileAudioMime.M4A,
    'audio/m4a': FileAudioMime.M4A,
    'video/x-msvideo': FileVideoMime.AVI,
    'text/x-markdown': FileDocumentMime.MD,
};

export const FILE_SIZE_MAX = 1073741824; // 1000 Mb
export const FILE_AMOUNT_MAX = 500;

export const FILE_NAME_MIN_LENGTH = 3;
export const FILE_NAME_MAX_LENGTH = 124;
