import * as _ from 'lodash';
import { User, UserAccountType } from '../user';
import { IUserEditDto } from '../api/user';

export class PermissionUtil {

    //--------------------------------------------------------------------------
    //
    // 	User Methods
    //
    //--------------------------------------------------------------------------

    public static userIsCanEdit(item: User, user: User, params?: IUserEditDto): boolean {
        if (_.isNil(user)) {
            return false;
        }
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        if (!_.isNil(params) && (!_.isNil(params.account) || !_.isNil(params.status))) {
            return false;
        }
        return item.id === user.id;
    }

    public static userIsAdministrator(item: User): boolean {
        return !_.isNil(item) ? item.account.type === UserAccountType.ADMINISTRATOR : false;
    }

}
