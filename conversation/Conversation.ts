import { Type } from 'class-transformer';
import * as _ from 'lodash';
import { AiConversationModel, AiModelConversationOptions } from '../ai';
import { Color } from '../color';
import { ConversationMessage } from './ConversationMessage';
import { File, IFileContentSearchOptions } from '../file';
import { User } from '../user';

export class Conversation {
    public id: number;
    public name: string;
    public status: ConversationStatus;
    public userId: number;
    public history: number;
    public picture: string;
    public isConsiderHistory: boolean;

    public tags?: Array<string>;
    public user?: User;
    public color?: Color;
    public system?: string;
    public messages?: Array<ConversationMessage>;
    public lastMessageDate?: Date;
    public historyResetDate?: Date;
    public fileSearchOptions?: IFileContentSearchOptions;

    @Type(() => File)
    public files?: Array<File>;

    public model: AiConversationModel;
    public options: AiModelConversationOptions;

    @Type(() => Date)
    public createdDate: Date;
}

export enum ConversationStatus {
    ERROR = "ERROR",
    LOADED = "LOADED",
    LOADING = "LOADING",
}

export enum ConversationCommand {
    HISTORY_RESET = 'HISTORY_RESET'
}

export const CONVERSATION_NAME_MIN_LENGTH = 2;
export const CONVERSATION_NAME_MAX_LENGTH = 64;

export const CONVERSATION_PICTURE_MIN_LENGTH = 2;
export const CONVERSATION_PICTURE_MAX_LENGTH = 1024;

export const CONVERSATION_SYSTEM_MAX_LENGTH = 128_000;

export const CONVERSATION_HISTORY_MIN = 3;
export const CONVERSATION_HISTORY_MAX = 256;

export const CONVERSATION_TAGS_MAX_LENGTH = 16;