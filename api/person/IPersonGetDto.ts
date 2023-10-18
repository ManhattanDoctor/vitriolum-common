
import { ITraceable } from '@ts-core/common';
import { Person } from '../../lib/person';

export interface IPersonGetDto extends ITraceable {
    manner?: string;
}
export declare type IPersonGetDtoResponse = Person;
