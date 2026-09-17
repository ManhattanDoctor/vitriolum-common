import { Type } from 'class-transformer';
import { User } from '../user';
import { Agent } from './Agent';
import { FileMime } from '../file';

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

    /**
     * The node whose answer is the result of the whole run. A graph ends with a reviewer saying "ОК"
     * or with a person approving, and their word is not what the graph was run for: only the author
     * of the graph knows which node writes the result, so it is marked here rather than guessed
     */
    public isOutput?: boolean;

    // --------------------------------------------------------------------------
    //
    //  File Node Properties
    //
    // --------------------------------------------------------------------------

    /** What the file is filled with: the same substitutions the prompt of an agent accepts */
    public fileContent?: string;
    /** The name of the file, substitutions included; the extension comes from the mime */
    public fileName?: string;
    public fileMime?: FileMime;
    /** Каталог пользователя, куда кладётся файл; подстановки работают */
    public fileDirectory?: string;
    /** Метки файла: по ним его потом находят среди прочих. Подстановки работают в каждой */
    public fileTags?: Array<string>;

    // --------------------------------------------------------------------------
    //
    //  File Read Node Properties
    //
    // --------------------------------------------------------------------------

    /** Идентификатор читаемого файла; подстановки работают */
    public fileReadId?: string;
    /** Имя читаемого файла, если идентификатор неизвестен: берётся последний совпавший. Подстановки работают */
    public fileReadName?: string;
    /** Как отдать содержимое дальше: текстом или base64 — например, чтобы передать картинку */
    public fileReadEncoding?: AgentGraphNodeFileEncoding;

    // --------------------------------------------------------------------------
    //
    //  File Remove Node Properties
    //
    // --------------------------------------------------------------------------

    /** Что именно удалять: последний файл, все файлы прогона или названный по идентификатору */
    public fileRemoveMode?: AgentGraphNodeFileRemoveMode;
    /** Идентификатор удаляемого файла для режима ID; подстановки работают */
    public fileRemoveId?: string;
    /**
     * The content of "base64" is decoded instead of being written as it is: a node saving a picture
     * receives it already encoded, whereas a text is encoded by the node itself
     */
    public fileEncoding?: AgentGraphNodeFileEncoding;
    /**
     * A time mark is added to the name, so the runs of one graph do not overwrite each other.
     * Turned off when a stable name is what the author needs. Defaults to true
     */
    public isFileNameUnique?: boolean;
}

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
    FILE_REMOVE = 'FILE_REMOVE'
}

export const AGENT_GRAPH_NAME_MIN_LENGTH = 3;
export const AGENT_GRAPH_NAME_MAX_LENGTH = 256;

export const AGENT_GRAPH_DESCRIPTION_MAX_LENGTH = 1024;

export const AGENT_GRAPH_NODES_MAX = 64;
export const AGENT_GRAPH_ITERATIONS_MAX = 32;

export const AGENT_GRAPH_NODE_START = '__start__';
export const AGENT_GRAPH_NODE_END = '__end__';
