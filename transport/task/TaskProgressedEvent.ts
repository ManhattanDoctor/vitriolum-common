import { TransportEvent } from "@ts-core/common";
import { ITaskEventDto } from "./TaskEventDto";

export class TaskProgressedEvent<T> extends TransportEvent<IAiTaskProgressDto<T>>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'TaskProgressedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IAiTaskProgressDto<T>) {
        super(TaskProgressedEvent.NAME, data);
    }
}

export interface IAiTaskProgressDto<T> extends ITaskEventDto {
    data?: T;
    total?: number;
    percent?: number;
    current?: number;
}
