import { TransportEvent } from "@ts-core/common";
import { IAgentEventDto } from "./IAgentEventDto";

export class AgentRemovedEvent extends TransportEvent<IAgentEventDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AgentRemovedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IAgentEventDto) {
        super(AgentRemovedEvent.NAME, data);
    }
}
