import { AgentGraph, AgentGraphEdge, AgentGraphNode, AgentGraphNodeType, AGENT_GRAPH_NODE_END, AGENT_GRAPH_NODE_START } from './AgentGraph';
import * as _ from 'lodash';

export class AgentGraphUtil {
    // --------------------------------------------------------------------------
    //
    // 	Constants
    //
    // --------------------------------------------------------------------------

    /** Идентификатор узла: подстановка "{scratchpad.uid}" читает только латиницу */
    private static UID = /^[A-Za-z][A-Za-z0-9_]*$/;

    /** Та же подстановка, что разбирает AgentGraphSubstitution: проверка ищет ссылки на несуществующие узлы */
    private static SCRATCHPAD = /\{scratchpad\.([A-Za-z][A-Za-z0-9_]*)\}/;

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

    public static isFile(item: AgentGraphNode): boolean {
        return !_.isNil(item) && (item.type === AgentGraphNodeType.FILE || item.type === AgentGraphNodeType.FILE_READ || item.type === AgentGraphNodeType.FILE_REMOVE);
    }

    // --------------------------------------------------------------------------
    //
    // 	Validation
    //
    // --------------------------------------------------------------------------

    /**
     * Все беды графа сразу, а не первая попавшаяся: автор правит их за один заход, а не открывает
     * редактор заново после каждого отказа. Проверки идут при сохранении, чтобы граф не падал
     * посреди прогона, когда первый узел уже отработал и оплачен
     */
    public static validate(item: AgentGraph): Array<IAgentGraphProblem> {
        let items = new Array<IAgentGraphProblem>();
        if (_.isNil(item)) {
            return items;
        }
        let nodes = !_.isEmpty(item.nodes) ? item.nodes : new Array<AgentGraphNode>();
        let edges = !_.isEmpty(item.edges) ? item.edges : new Array<AgentGraphEdge>();

        if (_.isEmpty(nodes)) {
            items.push({ code: AgentGraphProblem.NODES_EMPTY });
            return items;
        }
        let uids = nodes.map(node => node.uid);
        for (let node of nodes) {
            AgentGraphUtil.validateNode(node, uids, items);
        }
        let duplicated = _.uniq(uids.filter(uid => uids.filter(value => value === uid).length > 1));
        for (let uid of duplicated) {
            items.push({ code: AgentGraphProblem.UID_DUPLICATED, uid });
        }

        if (_.isEmpty(edges)) {
            items.push({ code: AgentGraphProblem.EDGES_EMPTY });
            return items;
        }
        let available = uids.concat([AGENT_GRAPH_NODE_START, AGENT_GRAPH_NODE_END]);
        for (let edge of edges) {
            if (!available.includes(edge.source)) {
                items.push({ code: AgentGraphProblem.EDGE_SOURCE_UNKNOWN, uid: edge.source });
            }
            if (!available.includes(edge.target)) {
                items.push({ code: AgentGraphProblem.EDGE_TARGET_UNKNOWN, uid: edge.target });
            }
        }
        if (_.isNil(edges.find(edge => edge.source === AGENT_GRAPH_NODE_START))) {
            items.push({ code: AgentGraphProblem.START_MISSING });
        }
        if (_.isNil(edges.find(edge => edge.target === AGENT_GRAPH_NODE_END))) {
            items.push({ code: AgentGraphProblem.END_MISSING });
        }
        // узел без входящих рёбер никогда не отработает: раньше такой граф молча собирался и запускался
        for (let node of nodes) {
            if (_.isNil(edges.find(edge => edge.target === node.uid))) {
                items.push({ code: AgentGraphProblem.NODE_UNREACHABLE, uid: node.uid });
            }
        }
        return items;
    }

    /** Беды, мешающие сохранению: незаполненные поля сюда не попадают, их доводят позже */
    public static validateSave(item: AgentGraph): Array<IAgentGraphProblem> {
        return AgentGraphUtil.validate(item).filter(value => value.isRunOnly !== true);
    }

    private static validateNode(node: AgentGraphNode, uids: Array<string>, items: Array<IAgentGraphProblem>): void {
        let { uid, type, options } = node;

        if (_.isEmpty(uid)) {
            items.push({ code: AgentGraphProblem.UID_EMPTY });
            return;
        }
        if (AgentGraphUtil.isReserved(uid)) {
            items.push({ code: AgentGraphProblem.UID_RESERVED, uid });
        }
        // подстановка "{scratchpad.uid}" читает только латиницу: кириллический uid молча не сработал бы
        else if (!AgentGraphUtil.UID.test(uid)) {
            items.push({ code: AgentGraphProblem.UID_INVALID, uid });
        }
        if (_.isEmpty(type)) {
            items.push({ code: AgentGraphProblem.TYPE_EMPTY, uid });
            return;
        }
        // незаполненность мешает работе, но не сохранению: граф собирают постепенно,
        // и новый начинается с пустого узла, которому агента ещё не выбрали
        if (type === AgentGraphNodeType.AGENT && _.isNil(node.agentId)) {
            items.push({ code: AgentGraphProblem.AGENT_MISSING, uid, isRunOnly: true });
        }
        if (type === AgentGraphNodeType.FILE && (_.isNil(options) || _.isEmpty(options.fileMime))) {
            items.push({ code: AgentGraphProblem.FILE_MIME_MISSING, uid, isRunOnly: true });
        }
        if (type === AgentGraphNodeType.FILE && (_.isNil(options) || _.isEmpty(options.fileContent))) {
            items.push({ code: AgentGraphProblem.FILE_CONTENT_MISSING, uid, isRunOnly: true });
        }
        // ссылка на узел, которого нет: опечатка в uid оставляла пустое место вместо ответа
        if (!_.isNil(options) && !_.isEmpty(options.prompt)) {
            let match: RegExpExecArray;
            let expression = new RegExp(AgentGraphUtil.SCRATCHPAD.source, 'g');
            while (!_.isNil(match = expression.exec(options.prompt))) {
                if (!uids.includes(match[1])) {
                    items.push({ code: AgentGraphProblem.SCRATCHPAD_UNKNOWN, uid, value: match[1] });
                }
            }
        }
    }
}

export enum AgentGraphProblem {
    NODES_EMPTY = 'NODES_EMPTY',
    EDGES_EMPTY = 'EDGES_EMPTY',
    UID_EMPTY = 'UID_EMPTY',
    UID_INVALID = 'UID_INVALID',
    UID_RESERVED = 'UID_RESERVED',
    UID_DUPLICATED = 'UID_DUPLICATED',
    TYPE_EMPTY = 'TYPE_EMPTY',
    AGENT_MISSING = 'AGENT_MISSING',
    FILE_MIME_MISSING = 'FILE_MIME_MISSING',
    FILE_CONTENT_MISSING = 'FILE_CONTENT_MISSING',
    SCRATCHPAD_UNKNOWN = 'SCRATCHPAD_UNKNOWN',
    EDGE_SOURCE_UNKNOWN = 'EDGE_SOURCE_UNKNOWN',
    EDGE_TARGET_UNKNOWN = 'EDGE_TARGET_UNKNOWN',
    START_MISSING = 'START_MISSING',
    END_MISSING = 'END_MISSING',
    NODE_UNREACHABLE = 'NODE_UNREACHABLE'
}

export interface IAgentGraphProblem {
    code: AgentGraphProblem;
    /** Узел, с которым беда: по нему редактор подсвечивает место */
    uid?: string;
    /** Подробность беды, например имя узла, которого нет в подстановке */
    value?: string;
    /** Беда мешает работе графа, но не его сохранению: поле просто ещё не заполнили */
    isRunOnly?: boolean;
}
