import * as _ from 'lodash';
import { User, UserAccountType } from '../user';
import { IUserEditDto } from '../api/user';
import { Conversation, ConversationStatus } from '../conversation';
import { File } from '../file';
import { OpenAiAgent } from '../ai/model/openAi';

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

    public static conversationIsCanCommand(item: Conversation, user: User): boolean {
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

    //--------------------------------------------------------------------------
    //
    // 	File Methods
    //
    //--------------------------------------------------------------------------

    public static fileIsCanOpen(item: File, user: User): boolean {
        if (_.isNil(user)) {
            return false;
        }
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        return item.userId === user.id;
    }

    public static fileIsCanEdit(item: File, user: User): boolean {
        return PermissionUtil.fileIsCanOpen(item, user);
    }

    public static fileIsCanRemove(item: File, user: User): boolean {
        return PermissionUtil.fileIsCanOpen(item, user);
    }

    //--------------------------------------------------------------------------
    //
    // 	OpenAiAgnet Methods
    //
    //--------------------------------------------------------------------------

    public static openAiAgentIsCanOpen(item: OpenAiAgent, user: User): boolean {
        if (_.isNil(user)) {
            return false;
        }
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        return item.userId === user.id;
    }

    public static openAiAgentIsCanCheck(item: OpenAiAgent, user: User): boolean {
        if (!PermissionUtil.openAiAgentIsCanOpen(item, user)) {
            return false;
        }
        /*
        if (item.status !== ConversationStatus.ERROR) {
            return false;
        }
        */
        return true;
    }

    public static openAiAgentIsCanEdit(item: OpenAiAgent, user: User): boolean {
        return PermissionUtil.openAiAgentIsCanOpen(item, user);
    }

    public static openAiAgentIsCanCommand(item: OpenAiAgent, user: User): boolean {
        return PermissionUtil.openAiAgentIsCanOpen(item, user);
    }

    public static openAiAgentIsCanClear(item: OpenAiAgent, user: User): boolean {
        return PermissionUtil.openAiAgentIsCanMessageRemove(item, user);
    }

    public static openAiAgentIsCanRemove(item: OpenAiAgent, user: User): boolean {
        return PermissionUtil.openAiAgentIsCanOpen(item, user);
    }

    public static openAiAgentIsCanMessageAdd(item: OpenAiAgent, user: User): boolean {
        if (!PermissionUtil.openAiAgentIsCanOpen(item, user)) {
            return false;
        }
        /*
        if (item.status === ConversationStatus.LOADING) {
            return false;
        }
        */
        return true;
    }

    public static openAiAgentIsCanMessageRemove(item: OpenAiAgent, user: User): boolean {
        if (!PermissionUtil.openAiAgentIsCanOpen(item, user)) {
            return false;
        }
        return true;
    }
}
