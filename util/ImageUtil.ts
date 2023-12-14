import { Sha512 } from "@ts-core/common";
import * as _ from "lodash";

export class ImageUtil {

    // --------------------------------------------------------------------------
    //
    //  Static Methods
    //
    // --------------------------------------------------------------------------

    public static getAvatar(name: string, extension?: string): string {
        if (_.isNil(extension)) {
            extension = 'svg';
        }
        name = Sha512.hex(name).substring(0, 32);
        return `https://api.multiavatar.com/${name}.${extension}`;
    }

    public static getSize(size: string): IImageSize {
        let items = size.split('x');
        return items.length === 2 ? { width: Number(size[0]), height: Number(size[1]) } : null;
    }
}

export interface IImageSize {
    width: number;
    height: number;
}