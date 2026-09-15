import { AgentGraph, AgentGraphEdge, AgentGraphNode, AgentGraphNodeType, AGENT_GRAPH_NODE_END, AGENT_GRAPH_NODE_START } from './AgentGraph';
import * as _ from 'lodash';

export class AgentGraphUtil {
    // --------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    // --------------------------------------------------------------------------

    public static getRoom(id: number): string {
        return `agentGraph${id}`;
    }

    public static getRunRoom(session: string): string {
        return `agentGraphRun${session}`;
    }

    public static getNode(item: AgentGraph, uid: string): AgentGraphNode {
        return !_.isNil(item) && !_.isEmpty(item.nodes) ? item.nodes.find(node => node.uid === uid) : null;
    }

    public static getEdges(item: AgentGraph, uid: string): Array<AgentGraphEdge> {
        return !_.isNil(item) && !_.isEmpty(item.edges) ? item.edges.filter(edge => edge.source === uid) : [];
    }

    public static isReserved(uid: string): boolean {
        return uid === AGENT_GRAPH_NODE_START || uid === AGENT_GRAPH_NODE_END;
    }

    public static isAgent(item: AgentGraphNode): boolean {
        return !_.isNil(item) ? item.type === AgentGraphNodeType.AGENT : false;
    }

    public static isHuman(item: AgentGraphNode): boolean {
        return !_.isNil(item) ? item.type === AgentGraphNodeType.HUMAN : false;
    }
}
