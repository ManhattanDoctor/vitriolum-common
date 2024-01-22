import { File } from '../file';
import { Type } from 'class-transformer';
import * as _ from 'lodash';
import { Conversation } from './Conversation';

export enum ConversationMessageRole {
    USER = 'USER',
    SYSTEM = 'SYSTEM',
    COMMAND = 'COMMAND',
    ASSISTANT = 'ASSISTANT',
    // TOOL = 'TOOL',
    // FUNCTION = 'FUNCTION',
}

export enum ConversationMessageContentType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
}

export class ConversationMessage {
    id: number;
    role: ConversationMessageRole;
    contents: Array<ConversationMessageContent>;
    conversation: Conversation;
    conversationId: number;

    @Type(() => Date)
    createdDate: Date;
}

export class ConversationMessageContent {
    type: ConversationMessageContentType;
    value: string;
}

export const CONVERSATION_MESSAGE_CONTENT_MIN_LENGTH = 1;
export const CONVERSATION_MESSAGE_CONTENT_MAX_LENGTH = 131136;

