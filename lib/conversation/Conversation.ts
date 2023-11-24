import { Type } from 'class-transformer';
import * as _ from 'lodash';

export class Conversation {
    id: number;
    name: string;
    status: ConversationStatus;
    userId: number;
    system?: string;

    @Type(() => Date)
    createdDate: Date;
}

export enum ConversationStatus {
    ERROR = "ERROR",
    LOADED = "LOADED",
    LOADING = "LOADING",
}

export const CONVERSATION_NAME_MIN_LENGTH = 2;
export const CONVERSATION_NAME_MAX_LENGTH = 64;

export const CONVERSATION_SYSTEM_MIN_LENGTH = 2;
export const CONVERSATION_SYSTEM_MAX_LENGTH = 64;