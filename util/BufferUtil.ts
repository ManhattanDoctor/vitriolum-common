import { AI_MODEL_TIMEOUT } from '../ai';
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

    public static async fromUrl(url: string, timeout: number = AI_MODEL_TIMEOUT): Promise<Buffer> {
        let item = await fetch(url, { signal: AbortSignal.timeout(timeout) });
        return BufferUtil.fromBinary(item);
    }

    public static async fromBinary(item: Blob | Response | Body): Promise<Buffer> {
        return Buffer.from(await item.arrayBuffer())
    }

    public static fromString(item: string): Buffer {
        return Buffer.from(item, 'base64');
    }

    public static fromBase64Data(item: string): Buffer {
        let index = item.indexOf(BufferUtil.BASE64_PREFIX);
        return index > -1 ? BufferUtil.fromString(item.substr(index + BufferUtil.BASE64_PREFIX.length)) : null;
    }

    // --------------------------------------------------------------------------
    //
    //  To Methods
    //
    // --------------------------------------------------------------------------

    public static toBlob(item: Buffer, type: string): Blob {
        return new Blob([item], { type });
    }
    
    public static toString(item: Buffer): string {
        return item.toString('base64');
    }

    public static toBase64Data(item: Buffer | string, mime: string): string {
        if (!_.isString(item)) {
            item = BufferUtil.toString(item);
        }
        item = item.replace(/(\r\n|\n|\r)/gm, '')
        return `data:${mime};${BufferUtil.BASE64_PREFIX}${item}`;
    }
}