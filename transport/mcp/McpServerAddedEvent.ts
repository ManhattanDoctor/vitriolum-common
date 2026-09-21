import { TransportEvent } from "@ts-core/common";
import { McpServer } from "../../mcp";

export class McpServerAddedEvent extends TransportEvent<McpServer> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'McpServerAddedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: McpServer) {
        super(McpServerAddedEvent.NAME, data);
    }
}
