import { ITraceable } from "@ts-core/common";
import { CoinAccounts } from "../../coin";

export interface ICoinStatusGetDto extends ITraceable { }

export class CoinStatusGetDtoResponse {
    balances: CoinAccounts;
}
