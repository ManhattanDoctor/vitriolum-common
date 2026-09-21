import { TransportEvent } from "@ts-core/common";
import { IMcpServerEventDto } from "./IMcpServerEventDto";

export class McpServerRemovedEvent extends TransportEvent<IMcpServerEventDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'McpServerRemovedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IMcpServerEventDto) {
        super(McpServerRemovedEvent.NAME, data);
    }
}
