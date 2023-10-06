import { ITraceable } from '@ts-core/common';
import { User } from '../../user';

export interface IInitDto extends ITraceable { }

export interface IInitDtoResponse {
    user: User;
}
