import { Type } from 'class-transformer';
import { UserAccount } from './UserAccount';
import { UserPreferences } from './UserPreferences';
import { UserStatistics } from './UserStatistics';
import { UserToken } from './UserToken';

export class User {
    id: number;
    login: string;
    status: UserStatus;
    resource: UserResource;

    @Type(() => Date)
    createdDate: Date;

    @Type(() => UserAccount)
    account: UserAccount;

    @Type(() => UserToken)
    tokens: Array<UserToken>;

    @Type(() => UserPreferences)
    preferences: UserPreferences;

    @Type(() => UserStatistics)
    statistics?: UserStatistics;
}

export enum UserResource {
    VK = 'VK',
    MAIL = 'MAIL',
    YANDEX = 'YANDEX',
    GOOGLE = 'GOOGLE',
    TELEGRAM = 'TELEGRAM',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    NON_ACTIVE = 'NON_ACTIVE'
}

