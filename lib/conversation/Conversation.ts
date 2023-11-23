import { Type } from 'class-transformer';
import { ConversationMessage } from './ConversationMessage';
import * as _ from 'lodash';

export class Conversation {
    id: number;
    name: string;
    system?: string;

    @Type(() => ConversationMessage)
    messages: Array<ConversationMessage>;

    @Type(() => Date)
    createdDate: Date;
}

export const CONVERSATION_NAME_MIN_LENGTH = 3;
export const CONVERSATION_NAME_MAX_LENGTH = 64;