import { Voice } from '../../voice';

export interface IVoiceEditDto extends Partial<Voice> {
    id: number;
    name?: string;
}

export type IVoiceEditDtoResponse = Voice;