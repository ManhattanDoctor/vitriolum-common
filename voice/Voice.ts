import { Type } from 'class-transformer';
import { User } from '../user';

export class Voice {
    id: number;
    uid: string;
    name: string;
    userId: number;
    resource: VoiceResource;

    user?: User;

    @Type(() => Date)
    createdDate: Date;
}

export enum VoiceResource {
    SPEECHIFY = 'SPEECHIFY'
}
export const VOICE_NAME_MIN_LENGTH = 3;
export const VOICE_NAME_MAX_LENGTH = 256;
