import { ITraceable } from '@ts-core/common';
import { Voice } from '../../voice';

export interface IVoiceAddDto extends ITraceable {
    name: string;
    fileId: number;
}

export type IVoiceAddDtoResponse = Voice;
