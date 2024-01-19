import { ITraceable } from '@ts-core/common';
import { OpenAiAgentMessage, OpenAiAgentMessageRole } from '../../ai/model/openai';

export interface IOpenAiAgentMessageDto extends ITraceable {
    role: OpenAiAgentMessageRole;
    value: string;
    files?: Array<number>;
}

export type IOpenAiAgentMessageDtoResponse = OpenAiAgentMessage;