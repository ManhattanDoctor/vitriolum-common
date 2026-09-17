import { FileMime } from '../file';
import * as _ from 'lodash';

export class Base64Util {

    //--------------------------------------------------------------------------
    //
    //	Constants
    //
    //--------------------------------------------------------------------------

    private static DATA_PREFIX = 'data:';
    private static BASE64_PREFIX = 'base64,';

    // --------------------------------------------------------------------------
    //
    //  Static Methods
    //
    // --------------------------------------------------------------------------

    /** Отличает "data:image/png;base64,..." от голого base64 */
    public static isData(item: string): boolean {
        return _.isString(item) && item.startsWith(Base64Util.DATA_PREFIX) && item.includes(Base64Util.BASE64_PREFIX);
    }

    /** Достаёт mime из "data:image/png;base64,..." */
    public static getDataMime(item: string): FileMime {
        if (!Base64Util.isData(item)) {
            return null;
        }
        let value = item.substring(Base64Util.DATA_PREFIX.length, item.indexOf(Base64Util.BASE64_PREFIX)).replace(/;$/, '');
        return !_.isEmpty(value) ? value as FileMime : null;
    }

    /** Декодирует содержимое, отбрасывая префикс: без этого он декодируется вместе с данными и файл выходит битым */
    public static fromData(item: string): Buffer {
        let index = item.indexOf(Base64Util.BASE64_PREFIX);
        return index > -1 ? Buffer.from(item.substr(index + Base64Util.BASE64_PREFIX.length), 'base64') : null;
    }

    public static toData(item: Buffer | string, mime: string): string {
        let value = _.isString(item) ? item : item.toString('base64');
        value = value.replace(/(\r\n|\n|\r)/gm, '');
        return `${Base64Util.DATA_PREFIX}${mime};${Base64Util.BASE64_PREFIX}${value}`;
    }
}
