import { Type } from 'class-transformer';
import * as _ from 'lodash';
import { AiConversationModel, AiModelConversationOptions } from '../ai';

export class Conversation {
    id: number;
    name: string;
    status: ConversationStatus;
    userId: number;
    picture: string;

    color?: string;
    system?: string;

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

export enum ConversationColor {
    ONE = 'ONE',
    TWO = 'TWO',
    THREE = 'THREE',
    FOUR = 'FOUR',
    FIVE = 'FIVE',
    SIX = 'SIX',
    SEVEN = 'SEVEN'
}

export const CONVERSATION_NAME_MIN_LENGTH = 2;
export const CONVERSATION_NAME_MAX_LENGTH = 64;

export const CONVERSATION_PICTURE_MIN_LENGTH = 2;
export const CONVERSATION_PICTURE_MAX_LENGTH = 1024;

export const CONVERSATION_SYSTEM_MIN_LENGTH = 2;
export const CONVERSATION_SYSTEM_MAX_LENGTH = 1024;