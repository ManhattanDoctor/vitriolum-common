import { FilterableConditionType } from "@ts-core/common";

export enum ErrorCode {
    INVALID_REQUEST = 'INVALID_REQUEST',

    LOGIN_ID_INVALID = 'LOGIN_ID_INVALID',
    LOGIN_TOKEN_INVALID = 'LOGIN_TOKEN_INVALID',
    LOGIN_TOKEN_EXPIRED = 'LOGIN_TOKEN_EXPIRED',
    LOGIN_SIGNATURE_INVALID = 'LOGIN_SIGNATURE_INVALID',

    USER_UNDEFINED = 'USER_UNDEFINED',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_ACCOUNT_INVALID = 'USER_ACCOUNT_INVALID',
    USER_STATUS_INVALID = 'USER_STATUS_INVALID',
}

export interface IInvalidDto<T = any> {
    name?: string;
    value: T | Array<T>;
    expected?: T | Array<T>;
    condition?: FilterableConditionType;
}