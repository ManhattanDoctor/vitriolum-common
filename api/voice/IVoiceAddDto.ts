import { ITraceable } from '@ts-core/common';
import { Voice, VoiceResource } from '../../voice';

export interface IVoiceAddDto extends ITraceable {
    name: string;
    fileId: number;
    resource: VoiceResource;
}

export type IVoiceAddDtoResponse = Voice;
