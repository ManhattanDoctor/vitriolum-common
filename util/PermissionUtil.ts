import { User, UserAccountType } from '../user';
import { IUserEditDto } from '../api/user';
import { Conversation, ConversationStatus } from '../conversation';
import { File, FILE_PARENT_DIRECTORY_ID, FileType } from '../file';
import { Voice } from '../voice';
import { FileUtil } from './FileUtil';
import * as _ from 'lodash';

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
        switch (item.status) {
            case ConversationStatus.ERROR:
                return true;
            default:
                return false;
        }
    }

    public static conversationIsCanEdit(item: Conversation, user: User): boolean {
        return PermissionUtil.conversationIsCanOpen(item, user);
    }

    public static conversationIsCanExport(item: Conversation, user: User): boolean {
        return PermissionUtil.conversationIsCanOpen(item, user) && !_.isEmpty(item.messages);
    }

    public static conversationIsCanCommand(item: Conversation, user: User): boolean {
        return PermissionUtil.conversationIsCanOpen(item, user);
    }

    public static conversationIsCanClear(item: Conversation, user: User): boolean {
        return PermissionUtil.conversationIsCanMessageRemove(item, user);
    }

    public static conversationIsCanCancel(item: Conversation, user: User): boolean {
        if (!PermissionUtil.conversationIsCanOpen(item, user)) {
            return false;
        }
        switch (item.status) {
            case ConversationStatus.LOADING:
                return true;
            default:
                return false;
        }
    }

    public static conversationIsCanRemove(item: Conversation, user: User): boolean {
        return PermissionUtil.conversationIsCanOpen(item, user);
    }

    public static conversationIsCanMessageAdd(item: Conversation, user: User): boolean {
        if (!PermissionUtil.conversationIsCanOpen(item, user)) {
            return false;
        }
        return !PermissionUtil.conversationIsCanCheck(item, user);
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
        if (_.isNil(user) || item.id === FILE_PARENT_DIRECTORY_ID) {
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

    public static fileIsCanMove(item: File, user: User): boolean {
        return PermissionUtil.fileIsCanOpen(item, user);
    }
    
    public static fileIsCanRemove(item: File, user: User): boolean {
        return PermissionUtil.fileIsCanOpen(item, user);
    }

    public static fileIsCanContentVectorAdd(item: File, user: User): boolean {
        return _.isNil(item.vectorId) && PermissionUtil.fileIsCanOpen(item, user) && FileUtil.isCanContentVectorize(item.mime);
    }

    public static fileIsCanContentVectorGet(item: File, user: User): boolean {
        return FileUtil.isContentVectorized(item) && PermissionUtil.fileIsCanOpen(item, user);
    }

    public static fileIsCanContentVectorRemove(item: File, user: User): boolean {
        return FileUtil.isContentVectorized(item) && PermissionUtil.fileIsCanOpen(item, user);
    }

    public static fileIsCanConvertSoundExtract(item: File, user: User): boolean {
        return PermissionUtil.fileIsCanOpen(item, user) && item.type === FileType.VIDEO;
    }

    //--------------------------------------------------------------------------
    //
    // 	Voice Methods
    //
    //--------------------------------------------------------------------------

    public static voiceIsCanAdd(item: File, user: User): boolean {
        if (!PermissionUtil.fileIsCanOpen(item, user)) {
            return false;
        }
        return FileUtil.getType(item.mime) === FileType.AUDIO;
    }

    public static voiceIsCanOpen(item: Voice, user: User): boolean {
        if (_.isNil(user)) {
            return false;
        }
        if (PermissionUtil.userIsAdministrator(user)) {
            return true;
        }
        return item.userId === user.id;
    }

    public static voiceIsCanEdit(item: Voice, user: User): boolean {
        return PermissionUtil.voiceIsCanOpen(item, user);
    }

    public static voiceIsCanRemove(item: Voice, user: User): boolean {
        return PermissionUtil.voiceIsCanOpen(item, user);
    }
}
