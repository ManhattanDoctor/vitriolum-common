
import { ITraceable } from '@ts-core/common';
import { Person, PersonManner, PersonPrivacy } from '../../lib/person';

export interface IPersonAddDto extends ITraceable {
    name: string;
    role: string;
    privacy: PersonPrivacy;
    manners: Array<Partial<PersonManner>>;

    voiceId?: number;

    age?: number;
    locale?: string;
    avatar?: string;
    species?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
    descriptionShort?: string;
}
