import { TransportEvent } from "@ts-core/common";
import { File } from "../../file";
import { IFileEventDto } from "./IFileEventDto";

export class FileVectorErroredEvent extends TransportEvent<IFileVectorErroredEventDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'FileVectorErroredEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IFileVectorErroredEventDto) {
        super(FileVectorErroredEvent.NAME, data);
    }
}
export interface IFileVectorErroredEventDto extends IFileEventDto {
    error: Error;
}