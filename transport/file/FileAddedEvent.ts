import { TransportEvent } from "@ts-core/common";
import { File } from "../../file";

export class FileAddedEvent extends TransportEvent<File>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'FileAddedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: File) {
        super(FileAddedEvent.NAME, data);
    }
}