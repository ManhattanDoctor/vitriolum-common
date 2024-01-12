import { OpenAiAgent } from '../../ai/model/openAi';
import { IOpenAiAgentAddDto } from './IOpenAiAgentAddDto';

export interface IOpenAiAgentEditDto extends Partial<IOpenAiAgentAddDto> {
    id: number;
}

export type IOpenAiAgentEditDtoResponse = OpenAiAgent;