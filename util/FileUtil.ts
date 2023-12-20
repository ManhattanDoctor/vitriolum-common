import { FileAudioExtension, FileAudioMime, FileAudioMimes, FileDocumentExtension, FileDocumentMime, FileDocumentMimes, FileImageExtension, FileImageMime, FileImageMimes, FileType } from "../file";
import * as _ from 'lodash';

export class FileUtil {

    // --------------------------------------------------------------------------
    //
    //  Static Methods
    //
    // --------------------------------------------------------------------------

    public static createName(name: string, mime: string): string {
        let item = `${_.truncate(name, { length: 25 })}_${Date.now()}.${FileUtil.getExtension(mime)}`;
        return item;
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

    public static getExtension(mime: string): string {
        switch (mime) {
            case FileImageMime.PNG:
                return FileImageExtension.PNG;
            case FileImageMime.JPEG:
                return FileImageExtension.JPG;

            case FileAudioMime.MP3:
                return FileAudioExtension.MP3;
            case FileAudioMime.AAC:
                return FileAudioExtension.AAC;
            case FileAudioMime.OPUS:
                return FileAudioExtension.OPUS;
            case FileAudioMime.FLAC:
                return FileAudioExtension.FLAC;

            case FileDocumentMime.TXT:
                return FileDocumentExtension.TXT;
            case FileDocumentMime.DOC:
                return FileDocumentExtension.DOC;
            case FileDocumentMime.DOCX:
                return FileDocumentExtension.DOCX;
            case FileDocumentMime.PDF:
                return FileDocumentExtension.PDF;
            case FileDocumentMime.XLS:
                return FileDocumentExtension.XLS;
            case FileDocumentMime.XLSX:
                return FileDocumentExtension.XLSX;
        }
        return null;
    }
}