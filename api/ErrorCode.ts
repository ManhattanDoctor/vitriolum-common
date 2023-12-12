import { CoinId } from "../coin";
import { PaymentTransactionType } from "../payment";
import { FilterableConditionType } from "@ts-core/common";

export enum ErrorCode {
    INVALID_REQUEST = 'INVALID_REQUEST',
    INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
    LOCALE_PROJECT_NOT_FOUND = 'LOCALE_PROJECT_NOT_FOUND',
    
    LOGIN_ID_INVALID = 'LOGIN_ID_INVALID',
    LOGIN_TOKEN_INVALID = 'LOGIN_TOKEN_INVALID',
    LOGIN_SIGNATURE_INVALID = 'LOGIN_SIGNATURE_INVALID',

    USER_UNDEFINED = 'USER_UNDEFINED',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_FORBIDDEN = 'USER_FORBIDDEN',
    USER_TOKEN_INVALID = 'USER_TOKEN_INVALID',
    USER_TOKEN_EXPIRED = 'USER_TOKEN_EXPIRED',

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

export interface IInsufficientFundsDto {
    value: string;
    target: PaymentTransactionType;
    coinId: CoinId;
    expected: string;
}