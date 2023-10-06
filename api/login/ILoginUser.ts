import { UserPreferences } from "../../user";
import { ObjectUtil } from "@ts-core/common";
import * as _ from "lodash";

export class LoginUser {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public id: number | string;
    public preferences: Partial<UserPreferences>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(item?: any) {
        if (!_.isNil(item)) {
            this.parse(item);
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    //--------------------------------------------------------------------------

    protected parse(item: any): void {
        this.id = item.id.toString();
        this.preferences = {};
        ObjectUtil.copyProperties(item, this.preferences, ['name', 'email', 'phone', 'locale', 'isMale', 'picture', 'city', 'country', 'location', 'birthday', 'description'])
    }
}