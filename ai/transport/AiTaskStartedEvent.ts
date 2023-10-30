import { TransportEvent } from "@ts-core/common";
import { IAiTaskEventDto } from "./AiTaskEventDto";

export class AiTaskStartedEvent extends TransportEvent<IAiTaskEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AiTaskStartedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IAiTaskEventDto) {
        super(AiTaskStartedEvent.NAME, data);
    }
}
