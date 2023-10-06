export class UserAccount {
    type: UserAccountType;
}

export enum UserAccountType {
    FREE = 'FREE',
    MASTER = 'MASTER',
    ADMINISTRATOR = 'ADMINISTRATOR'
}
