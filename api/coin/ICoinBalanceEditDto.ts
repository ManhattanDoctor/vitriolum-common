import { CoinId } from '../../coin';
import { ITraceable } from '@ts-core/common';

export interface ICoinBalanceEditDto extends ITraceable {
    userId: number;
    coinId: CoinId;
    amount: string;
}

