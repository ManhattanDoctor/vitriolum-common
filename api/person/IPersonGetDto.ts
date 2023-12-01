
import { ITraceable } from '@ts-core/common';
import { Person } from '../../person';

export interface IPersonGetDto extends ITraceable {
    manner?: string;
}
export declare type IPersonGetDtoResponse = Person;
