
import { ITraceable } from '@ts-core/common';
import { OpenAiAgent, OpenAiAgentTool } from '../../ai/model/openai';
import { OpenAiTextModel } from '../../ai/model/openai';

export interface IOpenAiAgentAddDto extends ITraceable {
    name: string;
    model: OpenAiTextModel;

    tools?: Array<OpenAiAgentTool>;
    files?: Array<number>;
    system?: string;
}

export type IOpenAiAgentAddDtoResponse = OpenAiAgent;