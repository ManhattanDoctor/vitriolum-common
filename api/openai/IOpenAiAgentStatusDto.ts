export interface IOpenAiAgentStatusDtoResponse<T = string> {
    type: OpenAiAgentStatusType;
    value: T;
}

export enum OpenAiAgentStatusType {
    CODE = 'CODE',
    TEXT = 'TEXT',
    IMAGE = 'IMAGE'
}