import { TransportEvent } from "@ts-core/common";
import { IAiTaskEventDto } from "./AiTaskEventDto";

export class AiTaskProgressedEvent<T> extends TransportEvent<IAiTaskProgressDto<T>>{
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

    constructor(data: IAiTaskProgressDto<T>) {
        super(AiTaskProgressedEvent.NAME, data);
    }
}

export interface IAiTaskProgressDto<T> extends IAiTaskEventDto {
    data?: T;
    total?: number;
    percent?: number;
    current?: number;
}
