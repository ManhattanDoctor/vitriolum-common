
import { ITraceable } from '@ts-core/common';
import { PersonManner, PersonPrivacy } from '../../lib/person';

export interface IPersonAddDto extends ITraceable {
    name: string;
    privacy: PersonPrivacy;
    manners: Array<PersonManner>;

    voiceId?: number;

    age?: number;
    role?: string;
    locale?: string;
    avatar?: string;
    species?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
    descriptionShort?: string;
}
