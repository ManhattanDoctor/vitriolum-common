import * as _ from 'lodash';
import { ApiProperty, ApiPropertyOptional } from '@ts-core/swagger';

export enum UserPreferencesTheme {
    DARK = 'DARK',
    LIGHT = 'LIGHT',
}

export enum UserPreferencesLocale {
    RU = 'ru',
    EN = 'en',
}

export class UserPreferences {
    @ApiProperty({ description: 'Unique identifier' })
    uid: string;

    @ApiProperty({ description: 'Display name' })
    name: string;

    @ApiPropertyOptional({ description: 'UI theme', enum: UserPreferencesTheme })
    theme?: UserPreferencesTheme;

    @ApiPropertyOptional({ description: 'Phone number' })
    phone?: string;

    @ApiPropertyOptional({ description: 'Email address' })
    email?: string;

    @ApiPropertyOptional({ description: 'Preferred locale', enum: UserPreferencesLocale })
    locale?: UserPreferencesLocale;

    @ApiPropertyOptional({ description: 'Profile picture URL' })
    picture?: string;
}

export const USER_PREFERENCES_NAME_MIN_LENGTH = 1;
export const USER_PREFERENCES_NAME_MAX_LENGTH = 50;

export const USER_PREFERENCES_PHONE_MAX_LENGTH = 12;
export const USER_PREFERENCES_EMAIL_MAX_LENGTH = 256;
export const USER_PREFERENCES_PICTURE_MAX_LENGTH = 1024;
