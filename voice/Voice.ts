import { Type } from 'class-transformer';
import { User } from '../user';
import { ApiProperty, ApiPropertyOptional } from '@ts-core/swagger';

export enum VoiceResource {
    SPEECHIFY = 'SPEECHIFY'
}

export class Voice {
    @ApiProperty({ description: 'Voice ID' })
    id: number;

    @ApiProperty({ description: 'Voice unique identifier' })
    uid: string;

    @ApiProperty({ description: 'Voice name' })
    name: string;

    @ApiProperty({ description: 'Owner user ID' })
    userId: number;

    @ApiProperty({ description: 'Voice resource provider', enum: VoiceResource })
    resource: VoiceResource;

    user?: User;

    @ApiProperty({ description: 'Creation date', type: Date })
    @Type(() => Date)
    createdDate: Date;
}

export const VOICE_NAME_MIN_LENGTH = 3;
export const VOICE_NAME_MAX_LENGTH = 256;
