import { TransportEvent } from "@ts-core/common";

export class AiTaskProgressedEvent extends TransportEvent<IAiTaskProgressDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AiTaskProgressedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IAiTaskProgressDto) {
        super(AiTaskProgressedEvent.NAME, data);
    }
}

export interface IAiTaskProgressDto<T = string> {
    data?: T;
    total: number;
    percent: number;
    current: number;
}
