import { Type } from 'class-transformer';
import * as _ from 'lodash';
import { AiConversationModel, AiModelConversationOptions } from '../ai';
import { Color } from '../color';
import { ConversationMessage } from './ConversationMessage';
import { File, IFileContentSearchOptions } from '../file';
import { User } from '../user';

export class Conversation {
    id: number;
    name: string;
    status: ConversationStatus;
    userId: number;
    history: number;
    picture: string;
    isConsiderHistory: boolean;

    tags?: Array<string>;
    user?: User;
    color?: Color;
    system?: string;
    messages?: Array<ConversationMessage>;
    lastMessageDate?: Date;
    historyResetDate?: Date;
    fileSearchOptions?: IFileContentSearchOptions;

    @Type(() => File)
    files?: Array<File>;

    model: AiConversationModel;
    options: AiModelConversationOptions;

    @Type(() => Date)
    createdDate: Date;
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