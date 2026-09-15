import { ITraceable } from '@ts-core/common';
import { AgentGraph, AgentGraphEdge, AgentGraphNode } from '../../agent';

export interface IAgentGraphAddDto extends ITraceable {
    name: string;
    nodes: Array<AgentGraphNode>;
    edges: Array<AgentGraphEdge>;

    description?: string;
}

export type IAgentGraphAddDtoResponse = AgentGraph;
