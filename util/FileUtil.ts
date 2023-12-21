import { Sha512, TraceUtil } from "@ts-core/common";
import { FileAudioExtension, FileAudioMime, FileAudioMimes, FileDocumentExtension, FileDocumentMime, FileDocumentMimes, FileImageExtension, FileImageMime, FileImageMimes, FileType } from "../file";
import * as _ from 'lodash';

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