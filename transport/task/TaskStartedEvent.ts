import { TransportEvent } from "@ts-core/common";
import { ITaskEventDto } from "./TaskEventDto";

export class TaskStartedEvent extends TransportEvent<ITaskEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'TaskStartedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: ITaskEventDto) {
        super(TaskStartedEvent.NAME, data);
    }
}
