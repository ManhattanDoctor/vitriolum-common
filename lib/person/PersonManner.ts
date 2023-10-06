import * as _ from 'lodash';
import { Type } from 'class-transformer';

export class PersonManner {
    name: string;
    description: string;

    @Type(() => Date)
    createdDate: Date;
}
