import { Type } from 'class-transformer';
import { OpenAiTextModel } from "./IOpenAiText";
import { File } from "../../../file";
import { Color } from '../../../color';

export class OpenAiAgent {
    id: number;
    name: string;
    model: OpenAiTextModel;
    userId: number;
    status: OpenAiAgentStatus;
    picture: string;
    tools?: Array<OpenAiAgentTool>;
    color?: Color;
    system?: string;
    lastMessageDate?: Date;

    @Type(() => File)
    files?: Array<File>;

    @Type(() => Date)
    createdDate: Date;
}

export enum OpenAiAgentStatus {
    ERROR = "ERROR",
    LOADED = "LOADED",
    LOADING = "LOADING",
}

export enum OpenAiAgentRunStatus {
    QUEUED = 'queued',
    FAILED = 'failed',
    EXPIRED = 'expired',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    CANCELLING = 'cancelling',
    IN_PROGRESS = 'in_progress',
    REQUIRES_ACTION = 'requires_action',
}

export enum OpenAiAgentTool {
    RETRIEVAL = 'retrieval',
    CODE_INTERPRETER = 'code_interpreter',
}

export const OPEN_AI_AGENT_NAME_MIN_LENGTH = 2;
export const OPEN_AI_AGENT_NAME_MAX_LENGTH = 256;

export const OPEN_AI_AGENT_PICTURE_MIN_LENGTH = 2;
export const OPEN_AI_AGENT_PICTURE_MAX_LENGTH = 1024;

export const OPEN_AI_AGENT_SYSTEM_MAX_LENGTH = 32768;