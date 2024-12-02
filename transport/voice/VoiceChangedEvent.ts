
import { TransportEvent } from '@ts-core/common';
import { Voice } from '../../voice';
import { IVoiceEventDto } from './IVoiceEventDto';

export class VoiceChangedEvent extends TransportEvent<IVoiceChangedEventDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'VoiceChangedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IVoiceChangedEventDto) {
        super(VoiceChangedEvent.NAME, data);
    }
}
export interface IVoiceChangedEventDto extends IVoiceEventDto {
    item: Partial<Voice>;
}
