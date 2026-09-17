import { Type } from 'class-transformer';
import { CoinId } from './CoinId';

/**
 * The exchange rate is never updated in place: a new row is added instead, so the rate that was used
 * for an old transaction stays known and the history can be recalculated
 */
export class CoinRate {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    public id: number;
    public from: CoinId;
    public to: CoinId;
    public value: string;

    public description?: string;

    @Type(() => Date)
    public createdDate: Date;
}
