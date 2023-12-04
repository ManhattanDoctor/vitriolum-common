import { ITraceable } from '@ts-core/common';
import { CoinStatusGetDtoResponse } from '../coin';
import { User } from '../../user';

export interface IInitDto extends ITraceable { }

export interface IInitDtoResponse extends CoinStatusGetDtoResponse {
    user: User;
}
