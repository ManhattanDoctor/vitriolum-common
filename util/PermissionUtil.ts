import * as _ from 'lodash';
import { User, UserAccountType } from '../user';
import { IUserEditDto } from '../api/user';
import { Conversation, ConversationStatus } from '../conversation';

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

    public static userIsCanCoinAccountsGet(item: User, user: User): boolean {
        if (_.isNil(user)) {
            return false;
        }
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        return item.id === user.id;
    }

    //--------------------------------------------------------------------------
    //
    // 	Conversation Methods
    //
    //--------------------------------------------------------------------------

    public static conversationIsCanOpen(item: Conversation, user: User): boolean {
        if (_.isNil(user)) {
            return false;
        }
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        return item.userId === user.id;
    }

    public static conversationIsCanCheck(item: Conversation, user: User): boolean {
        if (!PermissionUtil.conversationIsCanOpen(item, user)) {
            return false;
        }
        if (item.status !== ConversationStatus.ERROR) {
            return false;
        }
        return true;
    }

    public static conversationIsCanEdit(item: Conversation, user: User): boolean {
        return PermissionUtil.conversationIsCanOpen(item, user);
    }

    public static conversationIsCanClear(item: Conversation, user: User): boolean {
        return PermissionUtil.conversationIsCanMessageRemove(item, user);
    }

    public static conversationIsCanRemove(item: Conversation, user: User): boolean {
        return PermissionUtil.conversationIsCanOpen(item, user);
    }

    public static conversationIsCanMessageAdd(item: Conversation, user: User): boolean {
        if (!PermissionUtil.conversationIsCanOpen(item, user)) {
            return false;
        }
        if (item.status === ConversationStatus.LOADING) {
            return false;
        }
        return true;
    }

    public static conversationIsCanMessageRemove(item: Conversation, user: User): boolean {
        if (!PermissionUtil.conversationIsCanOpen(item, user)) {
            return false;
        }
        return true;
    }
}
