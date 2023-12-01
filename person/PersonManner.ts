import * as _ from 'lodash';

export class PersonManner {
    type: string;
    name: string;
    description: string;
}

export const PERSON_MANNER_NAME_MIN_LENGTH = 4;
export const PERSON_MANNER_NAME_MAX_LENGTH = 24;

export const PERSON_MANNER_TYPE_MIN_LENGTH = 4;
export const PERSON_MANNER_TYPE_MAX_LENGTH = 16;

export const PERSON_MANNER_DESCRIPTION_MIN_LENGTH = 4;
export const PERSON_MANNER_DESCRIPTION_MAX_LENGTH = 256;
