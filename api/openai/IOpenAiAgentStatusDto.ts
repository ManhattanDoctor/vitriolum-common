export interface IOpenAiAgentStatusDtoResponse<T = string> {
    type: OpenAiAgentStatusType;
    value: T;
}

export enum OpenAiAgentStatusType {
    TEXT = 'TEXT',
    FUNCTION = 'FUNCTION',
    RETRIEVAL = 'RETRIEVAL',
    IMAGE_FILE = 'IMAGE_FILE',
    CODE_INTERPRETER = 'CODE_INTERPRETER',
}