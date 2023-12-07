import { TransportEvent } from "@ts-core/common";
import { CoinAccounts, ICoinAmount } from "../../coin";

export class CoinBalanceChangedEvent extends TransportEvent<CoinAccounts>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'CoinBalanceChangedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: CoinAccounts) {
        super(CoinBalanceChangedEvent.NAME, data);
    }
}
