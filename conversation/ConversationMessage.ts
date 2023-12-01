import { File } from '../file';
import { Type } from 'class-transformer';
import * as _ from 'lodash';

export enum ConversationMessageRole {
    USER = 'USER',
    TOOL = 'TOOL',
    SYSTEM = 'SYSTEM',
    FUNCTION = 'FUNCTION',
    ASSISTANT = 'ASSISTANT',
}

export enum ConversationMessageContentType {
    TEXT = 'TEXT',
    IMAGE_URL = 'IMAGE_URL',
}

export class ConversationMessage {
    id: number;
    role: ConversationMessageRole;
    contents: Array<ConversationMessageContent>;
    conversationId: number;

    @Type(() => Date)
    createdDate: Date;
}

export class ConversationMessageContent {
    type: ConversationMessageContentType;
    value: string;

    @Type(() => File)
    file?: File;
}

export const CONVERSATION_MESSAGE_CONTENT_MIN_LENGTH = 1;
export const CONVERSATION_MESSAGE_CONTENT_MAX_LENGTH = 131136;

