import { ITraceable } from '@ts-core/common';
import { OpenAiAgentMessage, OpenAiAgentMessageRole } from '../../ai/model/openai';

export interface IOpenAiAgentMessageAddDto extends ITraceable {
    role: OpenAiAgentMessageRole;
    text: string;
    files?: Array<number>;
}

export type IOpenAiAgentMessageAddDtoResponse = OpenAiAgentMessage;