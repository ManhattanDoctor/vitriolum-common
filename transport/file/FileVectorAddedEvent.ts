import { TransportEvent } from "@ts-core/common";
import { IFileEventDto } from "./IFileEventDto";

export class FileVectorAddedEvent extends TransportEvent<IFileEventDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'FileVectorAddedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IFileEventDto) {
        super(FileVectorAddedEvent.NAME, data);
    }
}