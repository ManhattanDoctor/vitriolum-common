import { Type } from 'class-transformer';
import * as _ from 'lodash';
import { AiConversationModel, AiModelConversationOptions } from '../ai';
import { Color } from '../color';

export class Conversation {
    id: number;
    name: string;
    status: ConversationStatus;
    userId: number;
    history: number;
    picture: string;
    isConsiderHistory: boolean;

    color?: Color;
    system?: string;
    lastMessageDate?: Date;
    historyResetDate?: Date;

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

export const CONVERSATION_SYSTEM_MAX_LENGTH = 1024;

export const CONVERSATION_HISTORY_MIN = 3;
export const CONVERSATION_HISTORY_MAX = 256;