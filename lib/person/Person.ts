import { Type } from 'class-transformer';
import { PersonManner } from './PersonManner';
import { Voice } from '../voice';
import { File } from '../file';
import * as _ from 'lodash';

export class Person {
    uid: string;
    age?: number;
    name: string;
    role?: string;
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

export enum PersonPrivacy {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}
