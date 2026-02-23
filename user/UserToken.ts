import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@ts-core/swagger';

export class UserToken {
    @ApiProperty({ description: 'Token value' })
    value: string;

    @ApiPropertyOptional({ description: 'Token expiration date', type: Date })
    @Type(() => Date)
    expired?: Date;
}
