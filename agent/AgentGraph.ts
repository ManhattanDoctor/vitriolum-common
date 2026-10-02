import { Type } from 'class-transformer';
import { User } from '../user';
import { Agent } from './Agent';
import { FileMime } from '../file';
import { AiToolType } from '../ai/AiTool';
import { AnonymizePeople, AnonymizeType } from '../anonymize';
import { ApiProperty, ApiPropertyOptional } from '@ts-core/swagger';

// Перечисления и вложенные классы объявлены раньше AgentGraph: декораторы Swagger читают их
// при загрузке модуля, и объявленное ниже ещё не существует

/**
 * Что удаляет файловый узел. Режим задаётся явно, а не угадывается: удаление необратимо,
 * и узел, стоящий внутри цикла графа, срабатывает на каждом витке
 */
export enum AgentGraphNodeFileRemoveMode {
    LAST = 'LAST',
    ALL = 'ALL',
    ID = 'ID'
}

export enum AgentGraphNodeFileEncoding {
    TEXT = 'TEXT',
    BASE64 = 'BASE64'
}

export enum AgentGraphNodeType {
    AGENT = 'AGENT',
    CONDITION = 'CONDITION',
    HUMAN = 'HUMAN',
    /** Saves what the graph has made into a file of the user: no model is called, nothing is billed */
    FILE = 'FILE',
    /** Читает файл пользователя и кладёт его содержимое в состояние графа */
    FILE_READ = 'FILE_READ',
    /** Удаляет файл прогона: чужие файлы и каталоги узлу недоступны */
    FILE_REMOVE = 'FILE_REMOVE',
    /** Заменяет персональные данные метками: модели после него видят «[PERSON_1]» вместо имени */
    ANONYMIZE = 'ANONYMIZE',
    /** Возвращает на место персональные данные, спрятанные узлом ANONYMIZE */
    DEANONYMIZE = 'DEANONYMIZE'
}

/**
 * Тулы, которые агенту можно дать между ANONYMIZE и DEANONYMIZE: они получают от модели только
 * метки и сами данных пользователя не читают. Список разрешающий: новый тул в зону не попадёт,
 * пока его не проверят, а тул чтения документа отдал бы модели текст мимо анонимизации
 */
export const AGENT_GRAPH_ANONYMIZED_TOOLS: Array<string> = [
    AiToolType.YANDEX,
    AiToolType.WIKIPEDIA,
    AiToolType.WOLFRAM_ALPHA,
    AiToolType.IMAGE_OPEN_AI,
    AiToolType.IMAGE_RESIZE,
    AiToolType.MEDIA_CONVERT
];

export class AgentGraphNodePosition {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    @ApiProperty({ description: 'Horizontal position on the canvas' })
    public x: number;
    @ApiProperty({ description: 'Vertical position on the canvas' })
    public y: number;
}

export class AgentGraphNodeOptions {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    @ApiPropertyOptional({ description: 'Prompt of the node, substitutions allowed' })
    public prompt?: string;
    @ApiPropertyOptional({ description: 'How many times the node may run within one run' })
    public maxIterations?: number;

    /**
     * The node whose answer is the result of the whole run. A graph ends with a reviewer saying "ОК"
     * or with a person approving, and their word is not what the graph was run for: only the author
     * of the graph knows which node writes the result, so it is marked here rather than guessed
     */
    @ApiPropertyOptional({ description: 'The answer of this node is the result of the whole run' })
    public isOutput?: boolean;

    // --------------------------------------------------------------------------
    //
    //  File Node Properties
    //
    // --------------------------------------------------------------------------

    /** What the file is filled with: the same substitutions the prompt of an agent accepts */
    @ApiPropertyOptional({ description: 'FILE node: content of the file, substitutions allowed' })
    public fileContent?: string;
    /** The name of the file, substitutions included; the extension comes from the mime */
    @ApiPropertyOptional({ description: 'FILE node: name of the file without extension, substitutions allowed' })
    public fileName?: string;
    @ApiPropertyOptional({ description: 'FILE node: MIME type of the file', type: 'string' })
    public fileMime?: FileMime;
    /** Каталог пользователя, куда кладётся файл; подстановки работают */
    @ApiPropertyOptional({ description: 'FILE node: directory of the user, substitutions allowed' })
    public fileDirectory?: string;
    /** Метки файла: по ним его потом находят среди прочих. Подстановки работают в каждой */
    @ApiPropertyOptional({ description: 'FILE node: tags of the file, substitutions allowed', type: [String] })
    public fileTags?: Array<string>;

    // --------------------------------------------------------------------------
    //
    //  File Read Node Properties
    //
    // --------------------------------------------------------------------------

    /** Идентификатор читаемого файла; подстановки работают */
    @ApiPropertyOptional({ description: 'FILE_READ node: file ID, substitutions allowed' })
    public fileReadId?: string;
    /** Имя читаемого файла, если идентификатор неизвестен: берётся последний совпавший. Подстановки работают */
    @ApiPropertyOptional({ description: 'FILE_READ node: file name when the ID is unknown, the latest match is taken' })
    public fileReadName?: string;
    /** Как отдать содержимое дальше: текстом или base64 — например, чтобы передать картинку */
    @ApiPropertyOptional({ description: 'FILE_READ node: how the content is passed on', enum: AgentGraphNodeFileEncoding })
    public fileReadEncoding?: AgentGraphNodeFileEncoding;

    // --------------------------------------------------------------------------
    //
    //  File Remove Node Properties
    //
    // --------------------------------------------------------------------------

    /** Что именно удалять: последний файл, все файлы прогона или названный по идентификатору */
    @ApiPropertyOptional({ description: 'FILE_REMOVE node: what is removed', enum: AgentGraphNodeFileRemoveMode })
    public fileRemoveMode?: AgentGraphNodeFileRemoveMode;
    /** Идентификатор удаляемого файла для режима ID; подстановки работают */
    @ApiPropertyOptional({ description: 'FILE_REMOVE node: file ID for the ID mode, substitutions allowed' })
    public fileRemoveId?: string;
    /**
     * The content of "base64" is decoded instead of being written as it is: a node saving a picture
     * receives it already encoded, whereas a text is encoded by the node itself
     */
    @ApiPropertyOptional({ description: 'FILE node: encoding of the content', enum: AgentGraphNodeFileEncoding })
    public fileEncoding?: AgentGraphNodeFileEncoding;
    /**
     * A time mark is added to the name, so the runs of one graph do not overwrite each other.
     * Turned off when a stable name is what the author needs. Defaults to true
     */
    @ApiPropertyOptional({ description: 'FILE node: add a time mark to the name, true by default' })
    public isFileNameUnique?: boolean;

    // --------------------------------------------------------------------------
    //
    //  Anonymize Node Properties
    //
    // --------------------------------------------------------------------------

    @ApiPropertyOptional({ description: 'ANONYMIZE node: ALL hides every name, PRIVATE only private persons — with a patronymic or in fields of a document. ALL by default', enum: AnonymizePeople })
    public anonymizePeople?: AnonymizePeople;
    /** Не задано — как настроен сервис анонимизации */
    @ApiPropertyOptional({ description: 'ANONYMIZE node: made-up people instead of labels for Russian names. Not set — as configured in the service' })
    public anonymizeSurrogates?: boolean;
    /** Не задано — все виды. Пустой список не прятал бы ничего и при сохранении отклоняется */
    @ApiPropertyOptional({ description: 'ANONYMIZE node: kinds of data to hide. Not set — all of them', enum: AnonymizeType, isArray: true })
    public anonymizeTypes?: Array<AnonymizeType>;
    /** Что прятать всегда, даже если сервис этого не находит: фамилия, название проекта. В любом падеже */
    @ApiPropertyOptional({ description: 'ANONYMIZE node: strings to hide always, as whole words in any case', type: [String] })
    public anonymizeHide?: Array<string>;
    /** Что не прятать никогда, например название банка-партнёра */
    @ApiPropertyOptional({ description: 'ANONYMIZE node: strings never to hide, in any case', type: [String] })
    public anonymizeKeep?: Array<string>;
}

export class AgentGraphEdge {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    @ApiProperty({ description: 'Source node UID or __start__' })
    public source: string;
    @ApiProperty({ description: 'Target node UID or __end__' })
    public target: string;

    @ApiPropertyOptional({ description: 'Word the answer of the source node must contain to follow the edge' })
    public condition?: string;
}

export class AgentGraphNode {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    @ApiProperty({ description: 'Node UID, unique within the graph' })
    public uid: string;
    @ApiProperty({ description: 'Node type', enum: AgentGraphNodeType })
    public type: AgentGraphNodeType;

    @ApiPropertyOptional({ description: 'Agent ID for the AGENT node' })
    public agentId?: number;
    @ApiPropertyOptional({ description: 'Agent of the AGENT node' })
    public agent?: Agent;

    @ApiPropertyOptional({ description: 'Node name' })
    public name?: string;
    @ApiPropertyOptional({ description: 'Node options' })
    public options?: AgentGraphNodeOptions;
    @ApiPropertyOptional({ description: 'Node position on the canvas' })
    public position?: AgentGraphNodePosition;
}

export class AgentGraph {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    @ApiProperty({ description: 'Graph ID' })
    public id: number;
    @ApiProperty({ description: 'Graph name' })
    public name: string;
    @ApiProperty({ description: 'Owner user ID' })
    public userId: number;
    @ApiProperty({ description: 'Graph nodes', type: [AgentGraphNode] })
    public nodes: Array<AgentGraphNode>;
    @ApiProperty({ description: 'Graph edges', type: [AgentGraphEdge] })
    public edges: Array<AgentGraphEdge>;

    @ApiPropertyOptional({ description: 'Graph description' })
    public description?: string;

    public user?: User;

    @ApiProperty({ description: 'Creation date', type: Date })
    @Type(() => Date)
    public createdDate: Date;

    @ApiPropertyOptional({ description: 'Last update date', type: Date })
    @Type(() => Date)
    public updatedDate?: Date;
}

export const AGENT_GRAPH_NAME_MIN_LENGTH = 3;
export const AGENT_GRAPH_NAME_MAX_LENGTH = 256;

export const AGENT_GRAPH_DESCRIPTION_MAX_LENGTH = 1024;

export const AGENT_GRAPH_NODES_MAX = 64;
export const AGENT_GRAPH_ITERATIONS_MAX = 32;

export const AGENT_GRAPH_NODE_START = '__start__';
export const AGENT_GRAPH_NODE_END = '__end__';
