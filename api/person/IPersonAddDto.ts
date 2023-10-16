
import { ITraceable } from '@ts-core/common';
import { Person, PersonManner, PersonPrivacy } from '../../lib/person';

export interface IPersonAddDto extends ITraceable {
    name: string;
    role: string;
    manner: Partial<PersonManner>;
    privacy: PersonPrivacy;

    voiceId?: number;

    age?: number;
    locale?: string;
    avatar?: string;
    isMale?: boolean;
    location?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
}
export declare type IPersonAddDtoResponse = Person;
