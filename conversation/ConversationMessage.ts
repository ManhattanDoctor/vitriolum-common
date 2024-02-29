import { File } from '../file';
import { Type } from 'class-transformer';
import * as _ from 'lodash';
import { Conversation } from './Conversation';

export enum ConversationMessageRole {
    USER = 'USER',
    COMMAND = 'COMMAND',
    ASSISTANT = 'ASSISTANT',
    // TOOL = 'TOOL',
    // FUNCTION = 'FUNCTION',
}

export class ConversationMessage {
    id: number;
    role: ConversationMessageRole;
    conversation: Conversation;
    conversationId: number;

    text?: string;
    
    @Type(() => File)
    files?: Array<File>;

    @Type(() => Date)
    createdDate: Date;
}


export const CONVERSATION_MESSAGE_TEXT_MIN_LENGTH = 1;
export const CONVERSATION_MESSAGE_TEXT_MAX_LENGTH = 131136;

