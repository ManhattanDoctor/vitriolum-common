import { AgentGraph, AgentGraphEdge, AgentGraphNode, AgentGraphNodeType, AgentGraphNodeGraphPart, AgentGraphNodeOptions, AGENT_GRAPH_NODE_END, AGENT_GRAPH_NODE_START, AGENT_GRAPH_NODE_SEPARATOR, AGENT_GRAPH_ANONYMIZED_TOOLS } from './AgentGraph';
import { AnonymizePeople, AnonymizeType } from '../anonymize';
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

    /** Список файлов прогона: "{files}" и "{files.last}" */
    private static FILES = /\{files(\.last)?\}/;

    /** Узлы, которые приносят в зону анонимизации новый текст или выносят из неё метки */
    private static ANONYMIZED_FORBIDDEN = [AgentGraphNodeType.HUMAN, AgentGraphNodeType.FILE, AgentGraphNodeType.FILE_READ, AgentGraphNodeType.ANONYMIZE];

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

    public static isAnonymize(item: AgentGraphNode): boolean {
        return !_.isNil(item) && (item.type === AgentGraphNodeType.ANONYMIZE || item.type === AgentGraphNodeType.DEANONYMIZE);
    }

    public static isGraph(item: AgentGraphNode): boolean {
        return !_.isNil(item) && item.type === AgentGraphNodeType.GRAPH;
    }

    /** Вход вложенного графа в развёрнутом: «review____start__» — вход графа узла review */
    public static getGraphEnterUid(uid: string): string {
        return `${uid}${AGENT_GRAPH_NODE_SEPARATOR}${AGENT_GRAPH_NODE_START}`;
    }

    /**
     * Узел родителя, к которому относится узел развёрнутого графа: беду внутри вложенного графа
     * редактор подсвечивает на узле GRAPH, ведь других узлов вложенного графа на холсте нет
     */
    public static getGraphRootUid(item: AgentGraph, uid: string): string {
        let index = !_.isEmpty(uid) ? uid.indexOf(AGENT_GRAPH_NODE_SEPARATOR) : -1;
        if (index <= 0) {
            return uid;
        }
        let root = uid.substring(0, index);
        return AgentGraphUtil.isGraph(AgentGraphUtil.getNode(item, root)) ? root : uid;
    }

    /**
     * Вложенные графы встраиваются в родительский: узел GRAPH становится входом, узлами вложенного
     * графа с приставкой «uid__» и выходом под своим uid. Так пауза человека, зона анонимизации,
     * потолки и файлы работают внутри вложенного графа так же, как в родительском, без особых случаев.
     * Ссылки «{scratchpad.x}» вложенного графа переписываются на его узлы, а пометка результата
     * переходит к выходу: результат прогона выбирает родитель, вложенный граф отдаёт свой ему.
     * Незагруженный вложенный граф остаётся узлом GRAPH: прогнать его компилятор откажется
     */
    public static expand(item: AgentGraph): AgentGraph {
        if (_.isNil(item) || _.isEmpty(item.nodes) || !item.nodes.some(node => AgentGraphUtil.isGraph(node) && !_.isNil(node.graph) && _.isNil(node.graphPart))) {
            return item;
        }
        let nodes = new Array<AgentGraphNode>();
        let edges = !_.isEmpty(item.edges) ? item.edges.map(edge => ({ ...edge })) : new Array<AgentGraphEdge>();
        for (let node of item.nodes) {
            if (!AgentGraphUtil.isGraph(node) || _.isNil(node.graph) || !_.isNil(node.graphPart)) {
                nodes.push(node);
                continue;
            }
            let child = AgentGraphUtil.expand(node.graph);
            let prefix = `${node.uid}${AGENT_GRAPH_NODE_SEPARATOR}`;
            let enter = AgentGraphUtil.getGraphEnterUid(node.uid);
            let uids = child.nodes.map(value => value.uid);
            let rename = (uid: string): string => uid === AGENT_GRAPH_NODE_START ? enter : uid === AGENT_GRAPH_NODE_END ? node.uid : prefix + uid;

            let options = !_.isNil(node.options) ? node.options : {};
            nodes.push({ uid: enter, type: AgentGraphNodeType.GRAPH, name: node.name, graphPart: AgentGraphNodeGraphPart.ENTER, options: _.omitBy({ prompt: options.prompt, maxIterations: options.maxIterations }, _.isNil) });
            for (let value of child.nodes) {
                let copy = { ...value, uid: prefix + value.uid, options: AgentGraphUtil.renameOptions(value.options, uids, prefix) };
                if (!_.isNil(copy.graphOutputs)) {
                    copy.graphOutputs = copy.graphOutputs.map(uid => prefix + uid);
                }
                nodes.push(copy);
            }
            let outputs = child.nodes.filter(value => value.options?.isOutput === true).map(value => prefix + value.uid);
            nodes.push({ uid: node.uid, type: AgentGraphNodeType.GRAPH, name: node.name, graphPart: AgentGraphNodeGraphPart.EXIT, graphOutputs: outputs, options: options.isOutput === true ? { isOutput: true } : undefined });

            for (let edge of edges) {
                if (edge.target === node.uid) {
                    edge.target = enter;
                }
            }
            edges.push(...child.edges.map(edge => ({ ...edge, source: rename(edge.source), target: rename(edge.target) })));
        }
        // результат прогона выбирает родитель: пометки узлов вложенного графа живут только в его выходе
        for (let node of nodes) {
            if (node.uid.includes(AGENT_GRAPH_NODE_SEPARATOR) && node.graphPart !== AgentGraphNodeGraphPart.EXIT && node.options?.isOutput === true) {
                node.options = _.omit(node.options, 'isOutput');
            }
        }
        return { ...item, nodes, edges };
    }

    private static renameOptions(item: AgentGraphNodeOptions, uids: Array<string>, prefix: string): AgentGraphNodeOptions {
        if (_.isNil(item)) {
            return item;
        }
        let rename = (value: string): string => {
            if (_.isEmpty(value)) {
                return value;
            }
            return value.replace(new RegExp(AgentGraphUtil.SCRATCHPAD.source, 'g'), (match, uid) => uids.includes(uid) ? `{scratchpad.${prefix}${uid}}` : match);
        };
        let value = { ...item };
        for (let key of ['prompt', 'fileContent', 'fileName', 'fileDirectory', 'fileReadId', 'fileReadName', 'fileRemoveId']) {
            if (_.isString(value[key])) {
                value[key] = rename(value[key]);
            }
        }
        if (!_.isEmpty(value.fileTags)) {
            value.fileTags = value.fileTags.map(rename);
        }
        return value;
    }

    /**
     * Узлы, до которых прогон доходит от ANONYMIZE, не пройдя DEANONYMIZE: в них модель видит метки.
     * Выход в конец графа отмечается отдельно — через него метки попали бы в результат прогона
     */
    public static getAnonymizedZone(item: AgentGraph): IAgentGraphAnonymizedZone {
        let value: IAgentGraphAnonymizedZone = { uids: new Array(), exits: new Array() };
        if (_.isNil(item) || _.isEmpty(item.nodes)) {
            return value;
        }
        let queue = item.nodes.filter(node => node.type === AgentGraphNodeType.ANONYMIZE).map(node => node.uid);
        let visited = new Set<string>(queue);
        while (!_.isEmpty(queue)) {
            let uid = queue.shift();
            for (let edge of AgentGraphUtil.getEdges(item, uid)) {
                if (edge.target === AGENT_GRAPH_NODE_END) {
                    value.exits = _.uniq(value.exits.concat([uid]));
                    continue;
                }
                let node = AgentGraphUtil.getNode(item, edge.target);
                if (_.isNil(node) || node.type === AgentGraphNodeType.DEANONYMIZE) {
                    continue;
                }
                if (!value.uids.includes(node.uid)) {
                    value.uids.push(node.uid);
                }
                if (!visited.has(node.uid)) {
                    visited.add(node.uid);
                    queue.push(node.uid);
                }
            }
        }
        return value;
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
        AgentGraphUtil.validateAnonymizedZone(item, items);
        return items;
    }

    /**
     * Зона анонимизации проверяется по развёрнутому графу: вложенный граф внутри зоны со своим
     * чтением файла или человеком отдал бы модели исходный текст. Беда внутри вложенного графа
     * приписывается узлу GRAPH, который автор видит на холсте
     */
    private static validateAnonymizedZone(item: AgentGraph, items: Array<IAgentGraphProblem>): void {
        let values = new Array<IAgentGraphProblem>();
        AgentGraphUtil.validateAnonymizedZoneExpanded(AgentGraphUtil.expand(item), values);
        values = values.map(value => ({ ...value, uid: AgentGraphUtil.getGraphRootUid(item, value.uid) }));
        items.push(..._.uniqBy(values, value => `${value.code}:${value.uid}:${value.value}`));
    }

    /**
     * Зона анонимизации не обрабатывает данные, пришедшие в неё мимо ANONYMIZE, а запрещает их источники:
     * чтение файла, ответ человека и тул чтения документа отдали бы модели исходный текст.
     * Тулы агента проверяются, только когда агент загружен: при сохранении графа его ещё нет,
     * а перед прогоном есть, и агент к этому времени мог получить новые тулы
     */
    private static validateAnonymizedZoneExpanded(item: AgentGraph, items: Array<IAgentGraphProblem>): void {
        let zone = AgentGraphUtil.getAnonymizedZone(item);
        for (let uid of zone.exits) {
            items.push({ code: AgentGraphProblem.ANONYMIZED_END, uid });
        }
        for (let uid of zone.uids) {
            let node = AgentGraphUtil.getNode(item, uid);
            if (AgentGraphUtil.ANONYMIZED_FORBIDDEN.includes(node.type)) {
                items.push({ code: AgentGraphProblem.ANONYMIZED_NODE_FORBIDDEN, uid, value: node.type });
            }
            let options = node.options;
            if (!_.isNil(options) && options.isOutput === true) {
                items.push({ code: AgentGraphProblem.ANONYMIZED_OUTPUT, uid });
            }
            // задание узла GRAPH уходит агентам вложенного графа, как задание агента — модели
            if (node.type !== AgentGraphNodeType.AGENT && node.type !== AgentGraphNodeType.GRAPH) {
                continue;
            }
            if (!_.isNil(options) && !_.isEmpty(options.prompt) && AgentGraphUtil.FILES.test(options.prompt)) {
                items.push({ code: AgentGraphProblem.ANONYMIZED_FILES, uid });
            }
            if (node.type !== AgentGraphNodeType.AGENT) {
                continue;
            }
            let tools = !_.isNil(node.agent) && !_.isEmpty(node.agent.tools) ? node.agent.tools : new Array<string>();
            for (let tool of tools.filter(value => !AGENT_GRAPH_ANONYMIZED_TOOLS.includes(value))) {
                items.push({ code: AgentGraphProblem.ANONYMIZED_TOOL_FORBIDDEN, uid, value: tool });
            }
        }
    }

    /** Беды, мешающие сохранению: незаполненные поля сюда не попадают, их доводят позже */
    public static validateSave(item: AgentGraph): Array<IAgentGraphProblem> {
        return AgentGraphUtil.validate(item).filter(value => value.isRunOnly !== true);
    }

    /**
     * Опечатка в настройках прятала бы меньше, чем думает автор, и узнал бы он об этом только по утечке.
     * Поэтому неизвестный вид данных и пустой список видов — ошибка сохранения, а не тихое «ничего не скрыто»
     */
    private static validateAnonymize(node: AgentGraphNode, items: Array<IAgentGraphProblem>): void {
        let { uid, options } = node;
        if (!_.isNil(options.anonymizePeople) && !Object.values(AnonymizePeople).includes(options.anonymizePeople)) {
            items.push({ code: AgentGraphProblem.ANONYMIZE_PEOPLE_UNKNOWN, uid, value: options.anonymizePeople });
        }
        if (_.isNil(options.anonymizeTypes)) {
            return;
        }
        if (_.isEmpty(options.anonymizeTypes)) {
            items.push({ code: AgentGraphProblem.ANONYMIZE_TYPES_EMPTY, uid });
        }
        for (let value of options.anonymizeTypes.filter(item => !Object.values(AnonymizeType).includes(item))) {
            items.push({ code: AgentGraphProblem.ANONYMIZE_TYPE_UNKNOWN, uid, value });
        }
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
        if (type === AgentGraphNodeType.GRAPH && _.isNil(node.graphId)) {
            items.push({ code: AgentGraphProblem.GRAPH_MISSING, uid, isRunOnly: true });
        }
        if (type === AgentGraphNodeType.FILE && (_.isNil(options) || _.isEmpty(options.fileMime))) {
            items.push({ code: AgentGraphProblem.FILE_MIME_MISSING, uid, isRunOnly: true });
        }
        if (type === AgentGraphNodeType.FILE && (_.isNil(options) || _.isEmpty(options.fileContent))) {
            items.push({ code: AgentGraphProblem.FILE_CONTENT_MISSING, uid, isRunOnly: true });
        }
        if (type === AgentGraphNodeType.ANONYMIZE && !_.isNil(options)) {
            AgentGraphUtil.validateAnonymize(node, items);
        }
        // ссылка на узел, которого нет: опечатка в uid оставляет пустое место вместо ответа.
        // проверяются все поля с подстановками, а не только задание: файловый узел ссылается из содержимого
        if (_.isNil(options)) {
            return;
        }
        let templates = [options.prompt, options.fileContent, options.fileName, options.fileDirectory, options.fileReadId, options.fileReadName, options.fileRemoveId];
        if (!_.isEmpty(options.fileTags)) {
            templates.push(...options.fileTags);
        }
        for (let template of templates) {
            if (_.isEmpty(template)) {
                continue;
            }
            let match: RegExpExecArray;
            let expression = new RegExp(AgentGraphUtil.SCRATCHPAD.source, 'g');
            while (!_.isNil(match = expression.exec(template))) {
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
    NODE_UNREACHABLE = 'NODE_UNREACHABLE',
    ANONYMIZED_END = 'ANONYMIZED_END',
    ANONYMIZED_NODE_FORBIDDEN = 'ANONYMIZED_NODE_FORBIDDEN',
    ANONYMIZED_OUTPUT = 'ANONYMIZED_OUTPUT',
    ANONYMIZED_FILES = 'ANONYMIZED_FILES',
    ANONYMIZED_TOOL_FORBIDDEN = 'ANONYMIZED_TOOL_FORBIDDEN',
    ANONYMIZE_PEOPLE_UNKNOWN = 'ANONYMIZE_PEOPLE_UNKNOWN',
    ANONYMIZE_TYPES_EMPTY = 'ANONYMIZE_TYPES_EMPTY',
    ANONYMIZE_TYPE_UNKNOWN = 'ANONYMIZE_TYPE_UNKNOWN',
    GRAPH_MISSING = 'GRAPH_MISSING',
    GRAPH_UNKNOWN = 'GRAPH_UNKNOWN',
    GRAPH_CYCLE = 'GRAPH_CYCLE',
    GRAPH_DEPTH_EXCEED = 'GRAPH_DEPTH_EXCEED'
}

export interface IAgentGraphAnonymizedZone {
    /** Узлы, работающие с метками вместо персональных данных */
    uids: Array<string>;
    /** Узлы зоны, из которых есть ребро в конец графа */
    exits: Array<string>;
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
