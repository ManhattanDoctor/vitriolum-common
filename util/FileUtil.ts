import { FileAudioMime, FileAudioMimes, FileDocumentMime, FileDocumentMimes, FileImageMime, FileImageMimes, FileType } from "../file";
import * as _ from 'lodash';

export class FileUtil {

    // --------------------------------------------------------------------------
    //
    //  Static Methods
    //
    // --------------------------------------------------------------------------

    public static createName(name: string, mime: string): string {
        let item = `${_.truncate(name, { length: 10 })}_${Date.now()}.${FileUtil.getExtension(mime)}`;
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
                return 'png';
            case FileImageMime.JPEG:
                return 'jpg';
            case FileAudioMime.MP3:
                return 'mp3';
            case FileAudioMime.AAC:
                return 'aac';
            case FileAudioMime.OPUS:
                return 'opus';
            case FileAudioMime.FLAC:
                return 'flac';
            case FileDocumentMime.TXT:
                return 'txt';
            case FileDocumentMime.DOC:
                return 'doc';
            case FileDocumentMime.DOCX:
                return 'docx';
            case FileDocumentMime.PDF:
                return 'pdf';
            case FileDocumentMime.XLS:
                return 'xls';
            case FileDocumentMime.XLSX:
                return 'xlsx';
        }
        return null;
    }
}