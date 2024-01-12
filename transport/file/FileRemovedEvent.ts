import { TransportEvent } from "@ts-core/common";
import { IFileEventDto } from "./IFileEventDto";

export class FileRemovedEvent extends TransportEvent<IFileEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'FileRemovedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IFileEventDto) {
        super(FileRemovedEvent.NAME, data);
    }
}