import { Type } from 'class-transformer';

export class UserToken {
    value: string;

    @Type(() => Date)
    expired?: Date;
}