
import { Type } from 'class-transformer';
import { PaymentTransaction } from './PaymentTransaction';
import { User } from '../user';
import { ApiProperty, ApiPropertyOptional } from '@ts-core/swagger';

export enum PaymentAggregatorType {
    MONETA = 'MONETA'
}

export enum PaymentStatus {
    COMPLETED = 'COMPLETED'
}

export class Payment {
    @ApiProperty({ description: 'Payment ID' })
    id: number;

    @ApiProperty({ description: 'User ID' })
    userId: number;

    @ApiProperty({ description: 'Payment status', enum: PaymentStatus })
    status: PaymentStatus;

    @ApiProperty({ description: 'Payment transactions', type: [PaymentTransaction] })
    @Type(() => PaymentTransaction)
    transactions: Array<PaymentTransaction>;

    @ApiProperty({ description: 'Creation date', type: Date })
    @Type(() => Date)
    createdDate: Date;

    @ApiProperty({ description: 'Last update date', type: Date })
    @Type(() => Date)
    updatedDate: Date;

    @Type(() => User)
    user?: User;

    @ApiPropertyOptional({ description: 'Payment details', type: 'object' })
    details?: any;

    @ApiPropertyOptional({ description: 'Payment aggregator', enum: PaymentAggregatorType })
    aggregator?: PaymentAggregatorType;

    @ApiPropertyOptional({ description: 'External transaction ID' })
    transactionId?: string;
}
