import { AgentGraphNode, AgentGraphEdge, AgentGraphNodeType, AGENT_GRAPH_NODE_START, AGENT_GRAPH_NODE_END } from './AgentGraph';
import { FileDocumentMime } from '../file';

/**
 * Готовые схемы графа: собрать петлю с человеком посреди из пустых узлов непросто, а типовых
 * сценариев немного. Агенты не назначаются — они у каждого свои, узлы ждут выбора в редакторе.
 * Задания написаны с подстановками, поэтому схема работает и как пример
 */
export enum AgentGraphTemplate {
    EMPTY = 'EMPTY',
    REVIEW = 'REVIEW',
    HUMAN = 'HUMAN',
    FILE = 'FILE',
    PIPELINE = 'PIPELINE'
}

export interface IAgentGraphTemplate {
    nodes: Array<AgentGraphNode>;
    edges: Array<AgentGraphEdge>;
}

export class AgentGraphTemplateUtil {
    // --------------------------------------------------------------------------
    //
    //  Static Methods
    //
    // --------------------------------------------------------------------------

    public static get(item: AgentGraphTemplate): IAgentGraphTemplate {
        switch (item) {
            case AgentGraphTemplate.REVIEW:
                return AgentGraphTemplateUtil.getReview();
            case AgentGraphTemplate.HUMAN:
                return AgentGraphTemplateUtil.getHuman();
            case AgentGraphTemplate.FILE:
                return AgentGraphTemplateUtil.getFile();
            case AgentGraphTemplate.PIPELINE:
                return AgentGraphTemplateUtil.getPipeline();
            default:
                return AgentGraphTemplateUtil.getEmpty();
        }
    }

    /** Один узел между началом и концом: остальное дорисовывается на холсте */
    private static getEmpty(): IAgentGraphTemplate {
        return {
            nodes: [{ uid: 'node1', type: AgentGraphNodeType.AGENT, position: { x: 240, y: 160 } }],
            edges: [
                { source: AGENT_GRAPH_NODE_START, target: 'node1' },
                { source: 'node1', target: AGENT_GRAPH_NODE_END }
            ]
        };
    }

    /** Автор и рецензент по кругу: рецензент отвечает «ОК» или замечаниями */
    private static getReview(): IAgentGraphTemplate {
        return {
            nodes: [
                {
                    uid: 'author',
                    type: AgentGraphNodeType.AGENT,
                    name: 'Автор',
                    position: { x: 200, y: 260 },
                    options: {
                        isOutput: true,
                        maxIterations: 8,
                        prompt: [
                            'Задание: {input}',
                            'Твоя предыдущая работа: {scratchpad.author}',
                            'Замечание рецензента: {output}',
                            '',
                            'Если предыдущей работы нет — сделай новую по заданию. Если есть — исправь её по замечанию.',
                            'Верни только саму работу, без пояснений.'
                        ].join('\n')
                    }
                },
                {
                    uid: 'reviewer',
                    type: AgentGraphNodeType.AGENT,
                    name: 'Рецензент',
                    position: { x: 520, y: 260 },
                    options: {
                        prompt: [
                            'Оцени работу ниже.',
                            '',
                            'Если она готова — ответь ровно одним словом: ОК',
                            'Если нет — перечисли, что исправить, и закончи ответ словом ПРАВИТЬ',
                            '',
                            'Работа: {output}'
                        ].join('\n')
                    }
                }
            ],
            edges: [
                { source: AGENT_GRAPH_NODE_START, target: 'author' },
                { source: 'author', target: 'reviewer' },
                // условие стоит отдельным словом: поиск идёт по границам, а не по подстроке
                { source: 'reviewer', target: 'author', condition: 'ПРАВИТЬ' },
                { source: 'reviewer', target: AGENT_GRAPH_NODE_END, condition: 'ОК' }
            ]
        };
    }

    /** Агент работает, человек одобряет или возвращает на доработку */
    private static getHuman(): IAgentGraphTemplate {
        return {
            nodes: [
                {
                    uid: 'author',
                    type: AgentGraphNodeType.AGENT,
                    name: 'Исполнитель',
                    position: { x: 200, y: 260 },
                    options: {
                        isOutput: true,
                        maxIterations: 8,
                        prompt: [
                            'Задание: {input}',
                            'Твоя предыдущая работа: {scratchpad.author}',
                            'Замечание: {output}',
                            '',
                            'Если предыдущей работы нет — сделай новую по заданию. Если есть — исправь её по замечанию.'
                        ].join('\n')
                    }
                },
                { uid: 'check', type: AgentGraphNodeType.HUMAN, name: 'Проверка', position: { x: 520, y: 260 } }
            ],
            edges: [
                { source: AGENT_GRAPH_NODE_START, target: 'author' },
                { source: 'author', target: 'check' },
                // слова решения ставит сам узел человека, их не надо придумывать
                { source: 'check', target: 'author', condition: 'REJECTED' },
                { source: 'check', target: AGENT_GRAPH_NODE_END, condition: 'APPROVED' }
            ]
        };
    }

    /** Агент делает, файловый узел сохраняет результат */
    private static getFile(): IAgentGraphTemplate {
        return {
            nodes: [
                {
                    uid: 'author',
                    type: AgentGraphNodeType.AGENT,
                    name: 'Исполнитель',
                    position: { x: 200, y: 260 },
                    options: { isOutput: true, prompt: 'Задание: {input}' }
                },
                {
                    uid: 'saver',
                    type: AgentGraphNodeType.FILE,
                    name: 'Сохранение',
                    position: { x: 520, y: 260 },
                    options: {
                        fileMime: FileDocumentMime.TXT,
                        fileContent: '{scratchpad.author}',
                        fileName: 'результат'
                    }
                }
            ],
            edges: [
                { source: AGENT_GRAPH_NODE_START, target: 'author' },
                { source: 'author', target: 'saver' },
                { source: 'saver', target: AGENT_GRAPH_NODE_END }
            ]
        };
    }

    /** Два агента подряд: черновик и доработка, без петель */
    private static getPipeline(): IAgentGraphTemplate {
        return {
            nodes: [
                {
                    uid: 'draft',
                    type: AgentGraphNodeType.AGENT,
                    name: 'Черновик',
                    position: { x: 200, y: 260 },
                    options: { prompt: 'Задание: {input}\n\nСделай черновик.' }
                },
                {
                    uid: 'final',
                    type: AgentGraphNodeType.AGENT,
                    name: 'Доработка',
                    position: { x: 520, y: 260 },
                    options: {
                        isOutput: true,
                        prompt: 'Задание: {input}\n\nДоведи до готового вида черновик ниже.\n\nЧерновик: {output}'
                    }
                }
            ],
            edges: [
                { source: AGENT_GRAPH_NODE_START, target: 'draft' },
                { source: 'draft', target: 'final' },
                { source: 'final', target: AGENT_GRAPH_NODE_END }
            ]
        };
    }
}
