/**
 * The built in tools. The mcp servers are stored in the database instead
 * and referenced by their uid, so an agent tool is a plain string: either
 * an AiToolType value or an mcp server uid
 */
export enum AiToolType {
    YANDEX = 'YANDEX',
    WIKIPEDIA = 'WIKIPEDIA',
    WOLFRAM_ALPHA = 'WOLFRAM_ALPHA',
    IMAGE_RECOGNITION = 'IMAGE_RECOGNITION',
    IMAGE_OPEN_AI = 'IMAGE_OPEN_AI',
    TTS_OPEN_AI = 'TTS_OPEN_AI',
    STT_OPEN_AI = 'STT_OPEN_AI',
    MEDIA_CONVERT = 'MEDIA_CONVERT',
    IMAGE_RESIZE = 'IMAGE_RESIZE',
    DOCUMENT_SEARCH = 'DOCUMENT_SEARCH',
    DOCUMENT_READ = 'DOCUMENT_READ',
    DOCUMENT_DIFF = 'DOCUMENT_DIFF',
    TABLE_QUERY = 'TABLE_QUERY',
    DOCUMENT_WRITE = 'DOCUMENT_WRITE',
}

/** The lifecycle of a single tool call, reported to the client while the task is running */
export enum AiToolStatus {
    STARTED = 'STARTED',
    FINISHED = 'FINISHED',
    ERRORED = 'ERRORED',
}

/** A tool call in flight, shown to the user while the task is running */
export interface IAiToolProgress {
    /** Either an AiToolType value or an mcp tool name, so it is a plain string */
    uid: string;
    /** Present for the mcp tools only: the built in ones are translated by their uid */
    name?: string;
    /** What the model asked the tool to do, if it is known by the time of the call */
    args?: string;
    /** Present for a failed call only: such a record stays until the task is over, so that the user notices it */
    status?: AiToolStatus;
}

export interface IAiToolConsumption {
    type: string;
    value: string;
}

/**
 * A tool offered to the user: either a built in AiToolType value or an mcp server.
 * The built in ones are translated by their uid, the servers carry their own name
 */
export interface IAiToolItem {
    uid: string;
    name?: string;
}