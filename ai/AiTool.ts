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
    IMAGE_DRAWING_GPT = 'IMAGE_DRAWING_GPT',
    CONTENT_SUMMARIZATION = 'CONTENT_SUMMARIZATION',
}

export interface IAiToolConsumption {
    type: string;
    value: string;
}