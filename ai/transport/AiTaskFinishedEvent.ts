import { TransportEvent } from "@ts-core/common";
import { IAiTaskEventDto } from "./AiTaskEventDto";

export class AiTaskFinishedEvent extends TransportEvent<IAiTaskEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AiTaskFinishedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IAiTaskEventDto) {
        super(AiTaskFinishedEvent.NAME, data);
    }
}