import { AI_MODEL_TIMEOUT } from '../ai';
import { FileMime, IFileInput } from '../file';
import { DateUtil, UrlUtil } from '@ts-core/common';
import { FileUtil } from './FileUtil';
import * as _ from 'lodash';

export class BufferUtil {

    //--------------------------------------------------------------------------
    //
    //	Constants
    //
    //--------------------------------------------------------------------------

    private static BASE64_PREFIX = 'base64,';

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

    public static fromBase64Data(item: string): Buffer {
        let index = item.indexOf(BufferUtil.BASE64_PREFIX);
        return index > -1 ? BufferUtil.fromString(item.substr(index + BufferUtil.BASE64_PREFIX.length)) : null;
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

    public static toBase64Data(item: Buffer | string, mime: string): string {
        if (!_.isString(item)) {
            item = BufferUtil.toString(item);
        }
        item = item.replace(/(\r\n|\n|\r)/gm, '')
        return `data:${mime};${BufferUtil.BASE64_PREFIX}${item}`;
    }
}