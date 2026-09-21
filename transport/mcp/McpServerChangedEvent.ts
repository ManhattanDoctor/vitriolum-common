import { TransportEvent } from "@ts-core/common";
import { McpServer } from "../../mcp";
import { IMcpServerEventDto } from "./IMcpServerEventDto";

export class McpServerChangedEvent extends TransportEvent<IMcpServerChangedEventDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'McpServerChangedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IMcpServerChangedEventDto) {
        super(McpServerChangedEvent.NAME, data);
    }
}

export interface IMcpServerChangedEventDto extends IMcpServerEventDto {
    item: Partial<McpServer>;
}
