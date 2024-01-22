import { Type } from 'class-transformer';
import { OpenAiAgent } from './OpenAiAgent';
import * as _ from 'lodash';

export enum OpenAiAgentMessageRole {
    USER = 'USER',
    SYSTEM = 'SYSTEM',
    // COMMAND = 'COMMAND',
    ASSISTANT = 'ASSISTANT',
    // TOOL = 'TOOL',
    // FUNCTION = 'FUNCTION',
}

export enum OpenAiAgentMessageContentType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
}

export class OpenAiAgentMessage {
    id: number;
    role: OpenAiAgentMessageRole;
    contents: Array<OpenAiAgentMessageContent>;
    openAiAgent: OpenAiAgent;
    openAiAgentId: number;

    @Type(() => Date)
    createdDate: Date;
}

export class OpenAiAgentMessageContent {
    type: OpenAiAgentMessageContentType;
    value: string;
}

export const OPEN_AI_AGENT_MESSAGE_CONTENT_MIN_LENGTH = 1;
export const OPEN_AI_AGENT_MESSAGE_CONTENT_MAX_LENGTH = 131136;

