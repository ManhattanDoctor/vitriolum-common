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

    @Type(() => Date)
    createdDate: Date;
}

export class ConversationMessageContent {
    type: ConversationMessageContentType;
    value: string;

    @Type(() => File)
    file?: File;
}

export const PERSON_MANNER_NAME_MIN_LENGTH = 4;
export const PERSON_MANNER_NAME_MAX_LENGTH = 24;

