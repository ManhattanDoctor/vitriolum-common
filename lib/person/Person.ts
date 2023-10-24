import { Type } from 'class-transformer';
import { PersonManner } from './PersonManner';
import { Voice } from '../voice';
import { File } from '../file';
import * as _ from 'lodash';

export class Person {
    uid: string;
    age?: number;
    name: string;
    role?: PersonLocale;
    locale?: string;
    species?: string;
    privacy: PersonPrivacy;
    location?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
    
    @Type(() => File)
    video?: File;
    @Type(() => File)
    videoSmall?: File;

    @Type(() => File)
    avatar?: File;
    @Type(() => File)
    avatarSmall?: File;

    @Type(() => Voice)
    voice?: Voice;

    @Type(() => PersonManner)
    manner?: PersonManner;

    @Type(() => PersonManner)
    manners?: Array<PersonManner>;

    @Type(() => Date)
    createdDate: Date;
}

export enum PersonLocale {
    RU = 'RU',
    EN = 'EN',
}
export enum PersonPrivacy {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 64;

export const PERSON_ROLE_MIN_LENGTH = 1;
export const PERSON_ROLE_MAX_LENGTH = 128;

export const PERSON_SPECIES_MIN_LENGTH = 1;
export const PERSON_SPECIES_MAX_LENGTH = 128;

export const DESCRIPTION_MIN_LENGTH = 4;
export const DESCRIPTION_MAX_LENGTH = 256;

export const DESCRIPTION_SHORT_MIN_LENGTH = 4;
export const DESCRIPTION_SHORT_MAX_LENGTH = 32;
