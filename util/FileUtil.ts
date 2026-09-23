import { Sha512, TraceUtil, UnreachableStatementError } from "@ts-core/common";
import { FILE_VECTOR_ID_LOADING, FileAudioExtension, FileAudioExtensions, FileAudioMime, FileAudioMimes, FileDocumentExtension, FileDocumentExtensions, FileDocumentMime, FileDocumentMimes, FileExtensions, FileImageExtension, FileMimeAliases, FileImageExtensions, FileImageMime, FileImageMimes, FileMime, FileMimes, FileSystemExtensions, FileSystemMime, FileSystemMimes, FileType, FileVideoExtension, FileVideoExtensions, FileVideoMime, FileVideoMimes } from "../file";
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

    /**
     * Имя становится ключом в хранилище и частью ссылки, а приходит сюда сырым: в него попадает
     * промпт целиком. «?» и «#» обрезают ссылку при запросе, «/» создаёт лишнюю вложенность
     */
    public static clearName(item: string): string {
        return item
            .replace(/[\\/:*?"<>|#%&{}$+`'=@]/g, ' ')
            // управляющие символы в ключе недопустимы, а перевод строки ещё и ломает подпись запроса
            .replace(/[\x00-\x1f\x7f]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    public static createName(mime: string, name?: string): string {
        name = !_.isEmpty(name) ? FileUtil.clearName(name) : null;
        if (_.isEmpty(name)) {
            name = Sha512.hex(TraceUtil.generate());
        }
        return `${_.truncate(name, { length: 32, omission: '' })}_${Date.now()}.${FileUtil.getExtension(mime)}`;
    }

    /** Основное название формата вместо того, что прислал браузер: audio/x-m4a становится audio/mp4 */
    public static normalizeMime(mime: string): string {
        return !_.isNil(mime) && !_.isNil(FileMimeAliases[mime]) ? FileMimeAliases[mime] : mime;
    }

    /** Основное название и все его синонимы: окно выбора файла должно пропускать любое из них */
    private static getMimeWithAliases(mime: string): Array<string> {
        let items = [mime];
        for (let [alias, value] of Object.entries(FileMimeAliases)) {
            if (value === mime) {
                items.push(alias);
            }
        }
        return items;
    }

    public static getType(mime: string): FileType {
        mime = FileUtil.normalizeMime(mime);
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

    /** Для окна выбора файла: вместе с синонимами, иначе m4a с Mac в нём не выбрать */
    public static getMimes(extensions: Array<string>): Array<string> {
        let items = _.uniq(extensions).map(extension => FileUtil.getMime(extension)).filter(item => !_.isNil(item));
        return _.uniq(_.flatMap(items, item => FileUtil.getMimeWithAliases(item)));
    }

    /** Для окна выбора файла: вместе с синонимами */
    public static getMimesByType(type: FileType): Array<string> {
        let items: Array<string> = null;
        switch (type) {
            case FileType.IMAGE:
                items = FileImageMimes;
                break;
            case FileType.AUDIO:
                items = FileAudioMimes;
                break;
            case FileType.VIDEO:
                items = FileVideoMimes;
                break;
            case FileType.DOCUMENT:
                items = FileDocumentMimes;
                break;
            case FileType.LINK:
            case FileType.DIRECTORY:
                items = FileSystemMimes;
                break;
            default:
                throw new UnreachableStatementError(type);
        }
        return _.uniq(_.flatMap(items, item => FileUtil.getMimeWithAliases(item)));
    }

    // раньше список списков: работало лишь потому, что при склейке в строку массивы сливались через запятую
    public static getMimesByTypes(types: Array<FileType>): Array<string> {
        return _.uniq(_.flatMap(_.uniq(types), type => FileUtil.getMimesByType(type)));
    }

    public static getExtension(mime: string): FileExtension {
        return FileUtil.mimeToExtension[FileUtil.normalizeMime(mime)];
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
            case FileType.LINK:
            case FileType.DIRECTORY:
                return FileSystemExtensions;
            default:
                throw new UnreachableStatementError(type);
        }
    }

    /**
     * Расширение берётся из последнего сегмента пути: строка запроса и якорь отбрасываются,
     * иначе «file.mp3?x=1» давал «mp3?x=1», а «https://site.ru/file» — «ru/file»
     */
    public static getExtensionByUrl(item: string): string {
        if (_.isEmpty(item)) {
            return null;
        }
        let name = _.last(item.split(/[?#]/)[0].split('/'));
        let array = name.split('.');
        return array.length > 1 && !_.isEmpty(_.last(array)) ? _.last(array).toLowerCase() : null;
    }

    public static getExtensionsByTypes(types: Array<FileType>): Array<string> {
        return _.uniq(_.flatMap(_.uniq(types), type => FileUtil.getExtensionByType(type)));
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

    public static getIds(items: Array<File>): Array<number> {
        return !_.isEmpty(items) ? items.map(item => item.type === FileType.LINK ? item.linkTo : item.id) : null;
    }

    public static getDirectory(item: File): string {
        if (item.type !== FileType.DIRECTORY) {
            return ``;
        }
        let { directory, uid } = item;
        return !_.isEmpty(directory) ? `${directory}/${uid}` : uid;
    }

    public static getParentDirectory(item: string): string {
        if (_.isEmpty(item)) {
            return null;
        }
        let array = item.split('/');
        return array.length > 1 ? array.slice(0, -1).join('/') : null;
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
            // mpga — расширение mp3, под которым его принимает распознавание речи OpenAI
            item[FileAudioExtension.MPGA] = FileAudioMime.MPEG;
            item[FileImageExtension.JPEG] = FileImageMime.JPEG;
        }
        return this._extensionToMime;
    }
}