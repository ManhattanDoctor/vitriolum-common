import { Sha512, TraceUtil, UnreachableStatementError } from "@ts-core/common";
import { FILE_VECTOR_ID_LOADING, FileAudioExtension, FileAudioExtensions, FileAudioMime, FileAudioMimes, FileDocumentExtension, FileDocumentExtensions, FileDocumentMime, FileDocumentMimes, FileExtensions, FileImageExtension, FileImageExtensions, FileImageMime, FileImageMimes, FileMime, FileMimes, FileSystemExtensions, FileSystemMime, FileSystemMimes, FileType, FileVideoExtension, FileVideoExtensions, FileVideoMime, FileVideoMimes } from "../file";
import { File } from "../file";
import { FileExtension } from "../file";
import * as _ from 'lodash';

export class FileUtil {

    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    private static _extensionToMime: Record<FileExtension, FileMime>;
    private static _mimeToExtension: Record<FileMime, FileExtension>;

    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------

    public static createName(mime: string, name?: string): string {
        if (_.isEmpty(name)) {
            name = Sha512.hex(TraceUtil.generate());
        }
        return `${_.truncate(name, { length: 32, omission: '' })}_${Date.now()}.${FileUtil.getExtension(mime)}`;
    }

    public static getType(mime: string): FileType {
        if (FileImageMimes.includes(mime)) {
            return FileType.IMAGE;
        }
        if (FileAudioMimes.includes(mime)) {
            return FileType.AUDIO;
        }
        if (FileVideoMimes.includes(mime)) {
            return FileType.VIDEO;
        }
        if (FileDocumentMimes.includes(mime)) {
            return FileType.DOCUMENT;
        }
        return null;
    }

    public static getMime(extension: string): FileMime {
        return FileUtil.extensionToMime[extension];
    }

    public static getMimes(extensions: Array<string>): Array<string> {
        let items = [];
        _.uniq(extensions).forEach(extension => items.push(FileUtil.getMime(extension)));
        return items;
    }

    public static getMimesByType(type: FileType): Array<string> {
        switch (type) {
            case FileType.IMAGE:
                return FileImageMimes;
            case FileType.AUDIO:
                return FileAudioMimes;
            case FileType.VIDEO:
                return FileVideoMimes;
            case FileType.DOCUMENT:
                return FileDocumentMimes;
            case FileType.DIRECTORY:
                return FileSystemMimes;
            default:
                throw new UnreachableStatementError(type);
        }
    }
    public static getMimesByTypes(types: Array<FileType>): Array<string> {
        let items = [];
        _.uniq(types).forEach(type => items.push(FileUtil.getMimesByType(type)));
        return items;
    }

    public static getExtension(mime: string): FileExtension {
        return FileUtil.mimeToExtension[mime];
    }

    public static getExtensionByType(type: FileType): Array<string> {
        switch (type) {
            case FileType.IMAGE:
                return FileImageExtensions;
            case FileType.AUDIO:
                return FileAudioExtensions;
            case FileType.VIDEO:
                return FileVideoExtensions;
            case FileType.DOCUMENT:
                return FileDocumentExtensions;
            case FileType.DIRECTORY:
                return FileSystemExtensions;
            default:
                throw new UnreachableStatementError(type);
        }
    }

    public static getExtensionByUrl(item: string): string {
        let array = item.split('.');
        return array.length > 1 ? _.last(array) : null;
    }

    public static getExtensionsByTypes(extensions: Array<FileType>): Array<string> {
        let items = [];
        _.uniq(extensions).forEach(type => items.push(FileUtil.getExtensionByType(type)));
        return items;
    }

    public static isContentVectorized(item: File): boolean {
        return !_.isNil(item.vectorId) && item.vectorId !== FILE_VECTOR_ID_LOADING;
    }

    public static isContentVectorizing(item: File): boolean {
        return !_.isNil(item.vectorId) && item.vectorId === FILE_VECTOR_ID_LOADING;
    }

    public static isCanContentVectorize(item: string): boolean {
        switch (item) {
            case FileImageMime.PNG:
            case FileImageMime.JPEG:
            case FileDocumentMime.PDF:
            case FileDocumentMime.TXT:
            case FileDocumentMime.DOCX:
                return true;
            default:
                return false;
        }
    }

    public static getVectorId(item: File, chunk?: number): string {
        let prefix = `user${item.userId}#file${item.id}`;
        return !_.isNil(chunk) ? `${prefix}#chunk${chunk}` : prefix;
    }

    public static getVectorIds(item: File, vectorId?: number): Array<string> {
        if (_.isNil(vectorId)) {
            vectorId = item.vectorId;
        }
        let items = new Array();
        for (let i = 0; i < vectorId; i++) {
            items.push(FileUtil.getVectorId(item, i));
        }
        return items;
    }

    public static getDirectory(item: File): string {
        if (item.type !== FileType.DIRECTORY) {
            return ``;
        }
        let { directory, uid } = item;
        return !_.isEmpty(directory) ? `${directory}/${uid}` : uid;
    }

    // --------------------------------------------------------------------------
    //
    //  Private Properties
    //
    // --------------------------------------------------------------------------

    private static get mimeToExtension(): Record<FileMime, FileExtension> {
        if (_.isNil(this._mimeToExtension)) {
            let item = this._mimeToExtension = {} as Record<FileMime, FileExtension>;
            for (let [key, value] of Object.entries(FileImageMime)) item[value] = FileImageExtension[key];
            for (let [key, value] of Object.entries(FileAudioMime)) item[value] = FileAudioExtension[key];
            for (let [key, value] of Object.entries(FileVideoMime)) item[value] = FileVideoExtension[key];
            for (let [key, value] of Object.entries(FileDocumentMime)) item[value] = FileDocumentExtension[key];
            item[FileAudioMime.MPEG] = FileAudioExtension.MP3;
            item[FileImageMime.JPEG] = FileImageExtension.JPG;
        }
        return this._mimeToExtension;
    }

    private static get extensionToMime(): Record<FileExtension, FileMime> {
        if (_.isNil(this._extensionToMime)) {
            let item = this._extensionToMime = {} as Record<FileExtension, FileMime>;
            for (let [key, value] of Object.entries(this.mimeToExtension)) item[value as FileExtension] = key as FileMime;
            item[FileAudioExtension.MP3] = FileAudioMime.MPEG;
            item[FileImageExtension.JPEG] = FileImageMime.JPEG;
        }
        return this._extensionToMime;
    }
}