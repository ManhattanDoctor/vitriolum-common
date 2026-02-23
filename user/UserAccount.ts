import { ApiProperty } from '@ts-core/swagger';

export enum UserAccountType {
    FREE = 'FREE',
    ADMINISTRATOR = 'ADMINISTRATOR'
}

export class UserAccount {
    @ApiProperty({ description: 'Account type', enum: UserAccountType })
    type: UserAccountType;
}
