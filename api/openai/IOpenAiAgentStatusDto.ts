export interface IOpenAiAgentStatusDtoResponse {
    type: OpenAiAgentStatusType;
    data?: IOpenAiAgentStatusDtoResponseData;
}

export enum OpenAiAgentStatusType {
    TEXT = 'TEXT',
    FUNCTION = 'FUNCTION',
    RETRIEVAL = 'RETRIEVAL',
    IMAGE_FILE = 'IMAGE_FILE',
    CODE_INTERPRETER = 'CODE_INTERPRETER',
}

export type IOpenAiAgentStatusDtoResponseData = IOpenAiAgentStatusFunction | IOpenAiAgentStatusCodeInterpreter | string | void;

export interface IOpenAiAgentStatusCodeInterpreter {
    input: string;
    outputs: Array<any>;
}
export interface IOpenAiAgentStatusFunction {
    name: string;
    output: string;
    arguments: string;
}