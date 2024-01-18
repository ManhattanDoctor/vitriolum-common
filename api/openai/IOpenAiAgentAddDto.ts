
import { ITraceable } from '@ts-core/common';
import { OpenAiAgent, OpenAiAgentTool } from '../../ai/model/openai';
import { OpenAiTextModel } from '../../ai/model/openai';
import { Color } from '../../color';

export interface IOpenAiAgentAddDto extends ITraceable {
    name: string;
    model: OpenAiTextModel;

    color?: Color;
    tools?: Array<OpenAiAgentTool>;
    files?: Array<number>;
    system?: string;
}

export type IOpenAiAgentAddDtoResponse = OpenAiAgent;