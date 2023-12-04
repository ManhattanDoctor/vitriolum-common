export enum CoinId {
    RUB = 'RUB'
}

export interface ICoinAmount {
    amount: string;
    coinId: CoinId;
}
