import * as _ from "lodash";

export class DocumentUtil {

    // --------------------------------------------------------------------------
    //
    //  Public Static Methods
    //
    // --------------------------------------------------------------------------

    public static isKeySimple(key: string, translation: any): boolean {
        return DocumentUtil.isValueString(key, translation);
    }

    public static isValueString(key: string, translation: any): boolean {
        return _.isString(_.get(translation, key));
    }

    public static translate(key: string, translation: any): string {
        return _.get(translation, key);
    }

    public static isHasTranslation(key: string, translation: any): boolean {
        return !_.isNil(this.translate(key, translation));
    }

    // --------------------------------------------------------------------------
    //
    //  Public Static Methods
    //
    // --------------------------------------------------------------------------

    public static isKeyDescription(key: string): boolean {
        return key.includes('Description');
    }

}