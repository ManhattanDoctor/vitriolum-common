import { Type } from 'class-transformer';
import { ConversationMessage } from './ConversationMessage';
import * as _ from 'lodash';

export class Conversation {
    id: number;
    name: string;
    userId: number;
    system?: string;

    @Type(() => ConversationMessage)
    messages: Array<ConversationMessage>;

    @Type(() => Date)
    createdDate: Date;
}

export const CONVERSATION_NAME_MIN_LENGTH = 2;
export const CONVERSATION_NAME_MAX_LENGTH = 64;

export const CONVERSATION_SYSTEM_MIN_LENGTH = 2;
export const CONVERSATION_SYSTEM_MAX_LENGTH = 64;