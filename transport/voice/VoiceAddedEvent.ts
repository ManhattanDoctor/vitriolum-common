import { TransportEvent } from "@ts-core/common";
import { Voice } from "../../voice";

export class VoiceAddedEvent extends TransportEvent<Voice>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'VoiceAddedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: Voice) {
        super(VoiceAddedEvent.NAME, data);
    }
}