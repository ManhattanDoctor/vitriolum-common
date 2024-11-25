import { TransportEvent } from "@ts-core/common";
import { IVoiceEventDto } from "./IVoiceEventDto";

export class VoiceRemovedEvent extends TransportEvent<IVoiceEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'VoiceRemovedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IVoiceEventDto) {
        super(VoiceRemovedEvent.NAME, data);
    }
}