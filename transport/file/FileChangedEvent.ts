
import { TransportEvent } from '@ts-core/common';
import { File } from '../../file';
import { IFileEventDto } from './IFileEventDto';

export class FileChangedEvent extends TransportEvent<IFileChangedEventDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'FileChangedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IFileChangedEventDto) {
        super(FileChangedEvent.NAME, data);
    }
}
export interface IFileChangedEventDto extends IFileEventDto {
    item: Partial<File>;
}
