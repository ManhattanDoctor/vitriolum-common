import { Sha512 } from "@ts-core/common";
import * as _ from "lodash";

export class AvatarUtil {

    // --------------------------------------------------------------------------
    //
    //  Public Static Methods
    //
    // --------------------------------------------------------------------------

    public static get(name: string, extension?: string): string {
        if (_.isNil(extension)) {
            extension = 'svg';
        }
        name = Sha512.hex(name).substring(0, 32);
        return `https://api.multiavatar.com/${name}.${extension}`;
    }
}