import { CoinId } from '../../coin';
import { ITraceable } from '@ts-core/common';

export interface ICoinBalanceEditDto extends ITraceable {
    uid: string;
    coinId: CoinId;
    amount: string;
}

