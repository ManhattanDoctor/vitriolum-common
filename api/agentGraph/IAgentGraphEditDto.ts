import { AgentGraph } from '../../agent';

export interface IAgentGraphEditDto extends Partial<AgentGraph> {
    id: number;
    name?: string;
}

export type IAgentGraphEditDtoResponse = AgentGraph;
