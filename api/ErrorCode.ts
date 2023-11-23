import { FilterableConditionType } from "@ts-core/common";

export enum ErrorCode {
    INVALID_REQUEST = 'INVALID_REQUEST',

    LOGIN_ID_INVALID = 'LOGIN_ID_INVALID',
    LOGIN_TOKEN_INVALID = 'LOGIN_TOKEN_INVALID',
    LOGIN_SIGNATURE_INVALID = 'LOGIN_SIGNATURE_INVALID',

    USER_UNDEFINED = 'USER_UNDEFINED',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_TOKEN_INVALID = 'USER_TOKEN_INVALID',
    USER_TOKEN_EXPIRED = 'USER_TOKEN_EXPIRED',
    USER_STATUS_INVALID = 'USER_STATUS_INVALID',
    USER_ACCOUNT_INVALID = 'USER_ACCOUNT_INVALID',

    PERSON_NOT_FOUND = 'PERSON_NOT_FOUND',
    PERSON_FORBIDDEN = 'PERSON_FORBIDDEN',
    PERSON_MANNER_NOT_FOUND = 'PERSON_MANNER_NOT_FOUND',

    AI_TASK_ABORTED = 'AI_TASK_ABORTED',
    AI_TASK_NOT_FOUND = 'AI_TASK_NOT_FOUND',
    AI_TASK_FORBIDDEN = 'AI_TASK_FORBIDDEN',
    AI_MODEL_NOT_FOUND = 'AI_MODEL_NOT_FOUND',

    CONVERSATION_NOT_FOUND = 'CONVERSATION_NOT_FOUND',
    CONVERSATION_FORBIDDEN = 'CONVERSATION_FORBIDDEN',
}

export interface IInvalidDto<T = any> {
    name?: string;
    value: T | Array<T>;
    expected?: T | Array<T>;
    condition?: FilterableConditionType;
}