import { TransportEvent } from "@ts-core/common";
import { ITaskEventDto } from "./TaskEventDto";

export class TaskFinishedEvent extends TransportEvent<ITaskEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'TaskFinishedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: ITaskEventDto) {
        super(TaskFinishedEvent.NAME, data);
    }
}