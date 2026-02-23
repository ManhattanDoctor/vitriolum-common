import { Type } from 'class-transformer';
import { UserAccount } from './UserAccount';
import { UserPreferences } from './UserPreferences';
import { UserStatistics } from './UserStatistics';
import { UserToken } from './UserToken';
import { ApiProperty, ApiPropertyOptional } from '@ts-core/swagger';

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

export class User {
    @ApiProperty({ description: 'User ID' })
    id: number;

    @ApiProperty({ description: 'User login' })
    login: string;

    @ApiProperty({ description: 'User status', enum: UserStatus })
    status: UserStatus;

    @ApiProperty({ description: 'Authentication resource', enum: UserResource })
    resource: UserResource;

    @ApiProperty({ description: 'Registration date', type: Date })
    @Type(() => Date)
    createdDate: Date;

    @ApiProperty({ description: 'User account' })
    @Type(() => UserAccount)
    account: UserAccount;

    @ApiProperty({ description: 'User tokens', type: [UserToken] })
    @Type(() => UserToken)
    tokens: Array<UserToken>;

    @ApiProperty({ description: 'User preferences' })
    @Type(() => UserPreferences)
    preferences: UserPreferences;

    @ApiPropertyOptional({ description: 'User statistics' })
    @Type(() => UserStatistics)
    statistics?: UserStatistics;
}
