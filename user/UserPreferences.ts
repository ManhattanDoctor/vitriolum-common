import * as _ from 'lodash';

export class UserPreferences {
    uid: string;
    name: string;
    theme?: UserPreferencesTheme;
    phone?: string;
    email?: string;
    locale?: UserPreferencesLocale;
    picture?: string;
}

export enum UserPreferencesTheme {
    DARK = 'DARK',
    LIGHT = 'LIGHT',
}

export enum UserPreferencesLocale {
    RU = 'ru',
    EN = 'en',
}


export const USER_PREFERENCES_NAME_MIN_LENGTH = 1;
export const USER_PREFERENCES_NAME_MAX_LENGTH = 50;

export const USER_PREFERENCES_PHONE_MAX_LENGTH = 12;
export const USER_PREFERENCES_EMAIL_MAX_LENGTH = 256;
export const USER_PREFERENCES_PICTURE_MAX_LENGTH = 1024;
