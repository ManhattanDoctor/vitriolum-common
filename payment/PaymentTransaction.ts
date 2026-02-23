import { Type, Transform } from 'class-transformer';
import { CoinId, ICoinAmount } from '../coin';
import { AiModel } from '../ai';
import { AiModelConsumption } from '../ai';
import { AiModelOptions } from '../ai';
import { ApiProperty, ApiPropertyOptional } from '@ts-core/swagger';

export enum PaymentAccountId {
    CO_00 = 'CO-00', // Счет компании
    AG_00 = 'AG-00', // Счет аггрегатора
    PR_00 = 'PR-00', // Персональный счет клиента
}

export enum PaymentTransactionItemType {
    CONVERSATION = 'CONVERSATION_MESSAGE'
}

export enum PaymentTransactionType {
    REFUND = 'REFUND',
    PURCHASE = 'PURCHASE',
    CORRECTION = 'CORRECTION',
    TOOL_PURCHASE = 'TOOL_PURCHASE',
    TASK_PURCHASE = 'TASK_PURCHASE',
    AGENT_PURCHASE = 'AGENT_PURCHASE',

    REGISTRATION_BONUS = 'REGISTRATION_BONUS',
}

export class PaymentTransaction implements ICoinAmount {
    @ApiProperty({ description: 'Transaction ID' })
    id: number;

    @ApiProperty({ description: 'Transaction type', enum: PaymentTransactionType })
    type: PaymentTransactionType;

    @ApiProperty({ description: 'Debit account', enum: PaymentAccountId })
    debet: PaymentAccountId;

    @ApiProperty({ description: 'Credit account', enum: PaymentAccountId })
    credit: PaymentAccountId;

    @ApiProperty({ description: 'Transaction amount' })
    amount: string;

    @ApiProperty({ description: 'Coin type', enum: CoinId })
    coinId: CoinId;

    @ApiProperty({ description: 'User ID' })
    userId: number;

    @ApiPropertyOptional({ description: 'Transaction details', type: 'object' })
    details?: IPaymentTransactionDetails;

    @ApiProperty({ description: 'Creation date', type: Date })
    @Type(() => Date)
    createdDate: Date;

    @ApiPropertyOptional({ description: 'Payment ID' })
    paymentId?: number;

    @ApiPropertyOptional({ description: 'Activation date', type: Date })
    @Type(() => Date)
    activatedDate?: Date;
}

export interface IPaymentTransactionDetails {
    model: AiModel;
    options: AiModelOptions;
    consumption: AiModelConsumption;
}
