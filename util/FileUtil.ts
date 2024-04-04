import { Sha512, TraceUtil, UnreachableStatementError } from "@ts-core/common";
import { FileAudioExtension, FileAudioExtensions, FileAudioMime, FileAudioMimes, FileDocumentExtension, FileDocumentExtensions, FileDocumentMime, FileDocumentMimes, FileExtensions, FileImageExtension, FileImageExtensions, FileImageMime, FileImageMimes, FileMime, FileMimes, FileType } from "../file";
import * as _ from 'lodash';
import { File } from "../file";

export class FileUtil {

    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    private static _extensionToMime: Record<string, string>;
    private static _mimeToExtension: Record<string, string>;

    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------

    public static createName(mime: string, name?: string): string {
        if (_.isEmpty(name)) {
            name = Sha512.hex(TraceUtil.generate());
        }
        return `${_.truncate(name, { length: 16 })}_${Date.now()}.${FileUtil.getExtension(mime)}`;
    }

    public static getType(mime: string): FileType {
        if (FileImageMimes.includes(mime)) {
            return FileType.IMAGE;
        }
        if (FileAudioMimes.includes(mime)) {
            return FileType.AUDIO;
        }
        if (FileDocumentMimes.includes(mime)) {
            return FileType.DOCUMENT;
        }
        return null;
    }

    public static getMime(extension: string): string {
        return FileUtil.extensionToMime[extension];
    }

    public static getExtension(mime: string): string {
        return FileUtil.mimeToExtension[mime];
    }

    public static getMimesByType(type: FileType): Array<string> {
        if (_.isEmpty(type)) {
            return FileMimes;
        }
        switch (type) {
            case FileType.IMAGE:
                return FileImageMimes;
            case FileType.AUDIO:
                return FileAudioMimes;
            case FileType.DOCUMENT:
                return FileDocumentMimes;
            default:
                throw new UnreachableStatementError(type);
        }
    }

    public static getExtensionByType(type: FileType): Array<string> {
        if (_.isEmpty(type)) {
            return FileExtensions;
        }
        switch (type) {
            case FileType.IMAGE:
                return FileImageExtensions;
            case FileType.AUDIO:
                return FileAudioExtensions;
            case FileType.DOCUMENT:
                return FileDocumentExtensions;
            default:
                throw new UnreachableStatementError(type);
        }
    }

    public static isCanContentVectorize(item: string): boolean {
        switch (item) {
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

    public static getVectorIds(item: File): Array<string> {
        let items = new Array();
        for (let i = 0; i < item.vectorId; i++) {
            items.push(FileUtil.getVectorId(item, i));
        }
        return items;
    }

    // --------------------------------------------------------------------------
    //
    //  Private Properties
    //
    // --------------------------------------------------------------------------

    private static get mimeToExtension(): Record<string, string> {
        if (_.isNil(this._mimeToExtension)) {
            let item = this._mimeToExtension = {};
            for (let [key, value] of Object.entries(FileImageMime)) item[value] = FileImageExtension[key];
            for (let [key, value] of Object.entries(FileAudioMime)) item[value] = FileAudioExtension[key];
            for (let [key, value] of Object.entries(FileDocumentMime)) item[value] = FileDocumentExtension[key];
            item[FileImageMime.JPEG] = FileImageExtension.JPG;
        }
        return this._mimeToExtension;
    }

    private static get extensionToMime(): Record<string, string> {
        if (_.isNil(this._extensionToMime)) {
            let item = this._extensionToMime = {};
            for (let [key, value] of Object.entries(this.mimeToExtension)) item[value] = key;
            item[FileImageExtension.JPEG] = FileImageMime.JPEG;
        }
        return this._extensionToMime;
    }
}