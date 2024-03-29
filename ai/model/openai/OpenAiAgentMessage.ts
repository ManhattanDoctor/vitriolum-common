import { Type } from 'class-transformer';
import { OpenAiAgent } from './OpenAiAgent';
import { File } from '../../../file';
import * as _ from 'lodash';

export enum OpenAiAgentMessageRole {
    USER = 'USER',
    SYSTEM = 'SYSTEM',
    ASSISTANT = 'ASSISTANT',
    // TOOL = 'TOOL',
    // FUNCTION = 'FUNCTION',
    // ASSISTANT = 'ASSISTANT',
}

export class OpenAiAgentMessage {
    id: number;
    role: OpenAiAgentMessageRole;
    openAiAgent: OpenAiAgent;
    openAiAgentId: number;

    text?: string;

    @Type(() => File)
    files?: Array<File>;

    @Type(() => Date)
    createdDate: Date;
}

export const OPEN_AI_AGENT_MESSAGE_TEXT_MIN_LENGTH = 1;
export const OPEN_AI_AGENT_MESSAGE_TEXT_MAX_LENGTH = 15_000_000;

