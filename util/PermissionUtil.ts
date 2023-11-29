import * as _ from 'lodash';
import { User, UserAccountType } from '../user';
import { IUserEditDto } from '../api/user';
import { Person, PersonPrivacy } from '../lib/person';
import { Conversation, ConversationMessage, ConversationStatus } from '../lib/conversation';

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

    //--------------------------------------------------------------------------
    //
    // 	Person Methods
    //
    //--------------------------------------------------------------------------

    public static personIsCanOpen(item: Person, user: User): boolean {
        if (item.privacy === PersonPrivacy.PUBLIC) {
            return true;
        }
        return PermissionUtil.personIsCanEdit(item, user);
    }

    public static personIsCanTask(item: Person, user: User): boolean {
        if (!PermissionUtil.personIsCanOpen(item, user)) {
            return false;
        }
        if (_.isNil(user)) {
            return false;
        }
        return true;
    }

    public static personIsCanEdit(item: Person, user: User): boolean {
        if (_.isNil(user)) {
            return false;
        }
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        return item.userId === user.id;
    }

    public static personIsCanRemove(item: Person, user: User): boolean {
        return PermissionUtil.personIsCanEdit(item, user);
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

    public static conversationIsCanRemove(item: Conversation, user: User): boolean {
        return PermissionUtil.conversationIsCanOpen(item, user);
    }

    public static conversationIsCanMessageAdd(item: Conversation, user: User): boolean {
        if (!PermissionUtil.conversationIsCanOpen(item, user)) {
            return false;
        }
        if (item.status !== ConversationStatus.LOADED) {
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
