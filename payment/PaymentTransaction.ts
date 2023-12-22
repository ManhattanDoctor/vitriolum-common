import { Type, Transform } from 'class-transformer';
import { CoinId, ICoinAmount } from '../coin';
import { PaymentAccountId } from './Payment';
import { AiModel } from '../ai';
import { AiModelConsumption } from '../ai';
import { AiModelOptions } from '../ai';

export class PaymentTransaction implements ICoinAmount {
    id: number;
    type: PaymentTransactionType;
    debet: PaymentAccountId;
    credit: PaymentAccountId;
    amount: string;
    coinId: CoinId;
    userId: number;
    details?: IPaymentTransactionDetails;

    @Type(() => Date)
    createdDate: Date;

    paymentId?: number;

    @Type(() => Date)
    activatedDate?: Date;
}

export interface IPaymentTransactionDetails {
    model: AiModel;
    options: AiModelOptions;
    consumption: AiModelConsumption;
}

export enum PaymentTransactionItemType {
    CONVERSATION = 'CONVERSATION_MESSAGE'
}

export enum PaymentTransactionType {
    REFUND = 'REFUND',
    PURCHASE = 'PURCHASE',
    CORRECTION = 'CORRECTION',
    TASK_PURCHASE = 'TASK_PURCHASE',

    REGISTRATION_BONUS = 'REGISTRATION_BONUS',
}
