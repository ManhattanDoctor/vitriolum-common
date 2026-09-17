import { Type } from 'class-transformer';
import { CoinId } from '../coin';
import { AiModel } from './AiModel';

/**
 * The price of one model, kept as a whole instead of a row per number: the shape differs from model to model
 * (a text model is priced by the input and the output tokens, an image one by its size or quality, a voice one
 * by a plain number per 1000 characters), so a flat table would have to squeeze all of them into common columns
 */
export class AiPrice {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    public id: number;
    public model: AiModel;
    public value: AiPriceValue;
    /** The currency the provider itself charges in: GigaChat bills in rubles, the rest in dollars */
    public coinId: CoinId;

    public description?: string;

    @Type(() => Date)
    public createdDate: Date;

    @Type(() => Date)
    public updatedDate?: Date;
}

/** The tree as the provider publishes it: either a price right away, or a nested group of them */
export type AiPriceValue = { [key: string]: AiPriceValue | AiPriceTokens | string };

export interface AiPriceTokens {
    input: string;
    output: string;
}
