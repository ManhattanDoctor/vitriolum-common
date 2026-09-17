import { AI_MODEL_TIMEOUT } from '../ai';
import { FileMime, IFileInput } from '../file';
import { DateUtil, UrlUtil } from '@ts-core/common';
import { FileUtil } from './FileUtil';
import { Base64Util } from './Base64Util';
import * as _ from 'lodash';

export class BufferUtil {

    // --------------------------------------------------------------------------
    //
    //  From Methods
    //
    // --------------------------------------------------------------------------

    public static async fromUrl(url: string, timeout?: number): Promise<Buffer> {
        if (_.isNil(timeout)) {
            timeout = 5 * DateUtil.MILLISECONDS_MINUTE;
        }
        let item = await fetch(url, { signal: AbortSignal.timeout(timeout) });
        return BufferUtil.fromBinary(item);
    }

    public static async fromBinary(item: Blob | Response | Body): Promise<Buffer> {
        return Buffer.from(await item.arrayBuffer())
    }

    public static fromString(item: string, encoding?: BufferEncoding): Buffer {
        if (_.isNil(encoding)) {
            encoding = 'base64';
        }
        return Buffer.from(item, encoding);
    }

    public static async fromFileInput(item: IFileInput): Promise<{ buffer: Buffer, mime: FileMime }> {
        let { source, mime } = item;
        let buffer = BufferUtil.fromString(source);
        if (UrlUtil.isAbsoluteUrl(source)) {
            buffer = await BufferUtil.fromUrl(source);
            if (_.isEmpty(mime)) {
                mime = FileUtil.getMime(FileUtil.getExtensionByUrl(source));
            }
        }
        // без отрезания префикса "data:image/png;base64," он декодируется вместе с содержимым и файл выходит битым
        else if (Base64Util.isData(source)) {
            buffer = Base64Util.fromData(source);
            if (_.isEmpty(mime)) {
                mime = Base64Util.getDataMime(source);
            }
        }
        return { buffer, mime };
    }

    // --------------------------------------------------------------------------
    //
    //  To Methods
    //
    // --------------------------------------------------------------------------

    public static toBlob(item: Buffer, type: string): Blob {
        return new Blob([item as BlobPart], { type });
    }

    public static toString(item: Buffer, encoding?: BufferEncoding): string {
        if (_.isNil(encoding)) {
            encoding = 'base64';
        }
        return item.toString(encoding);
    }

}