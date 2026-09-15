import { ITraceable } from '@ts-core/common';
import { Agent } from '../../agent';
import { AiTextModel, AiModelTextOptions } from '../../ai';

export interface IAgentAddDto extends ITraceable {
    name: string;
    model: AiTextModel;
    options: AiModelTextOptions;

    system?: string;
    description?: string;
    /** Either an AiToolType value or an mcp server uid */
    tools?: Array<string>;
}

export type IAgentAddDtoResponse = Agent;
