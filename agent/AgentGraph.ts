import { Type } from 'class-transformer';
import { User } from '../user';
import { Agent } from './Agent';

export class AgentGraph {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    public id: number;
    public name: string;
    public userId: number;
    public nodes: Array<AgentGraphNode>;
    public edges: Array<AgentGraphEdge>;

    public description?: string;

    public user?: User;

    @Type(() => Date)
    public createdDate: Date;

    @Type(() => Date)
    public updatedDate?: Date;
}

export class AgentGraphNode {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    public uid: string;
    public type: AgentGraphNodeType;

    public agentId?: number;
    public agent?: Agent;

    public name?: string;
    public options?: AgentGraphNodeOptions;
    public position?: AgentGraphNodePosition;
}

export class AgentGraphEdge {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    public source: string;
    public target: string;

    public condition?: string;
}

export class AgentGraphNodePosition {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    public x: number;
    public y: number;
}

export class AgentGraphNodeOptions {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    public prompt?: string;
    public maxIterations?: number;
}

export enum AgentGraphNodeType {
    AGENT = 'AGENT',
    CONDITION = 'CONDITION',
    HUMAN = 'HUMAN'
}

export const AGENT_GRAPH_NAME_MIN_LENGTH = 3;
export const AGENT_GRAPH_NAME_MAX_LENGTH = 256;

export const AGENT_GRAPH_DESCRIPTION_MAX_LENGTH = 1024;

export const AGENT_GRAPH_NODES_MAX = 64;
export const AGENT_GRAPH_ITERATIONS_MAX = 32;

export const AGENT_GRAPH_NODE_START = '__start__';
export const AGENT_GRAPH_NODE_END = '__end__';
