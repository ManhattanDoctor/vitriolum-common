import { TransportEvent } from "@ts-core/common";
import { IAgentGraphRunEventDto } from "./IAgentGraphRunEventDto";

export class AgentGraphRunStartedEvent extends TransportEvent<IAgentGraphRunEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AgentGraphRunStartedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IAgentGraphRunEventDto) {
        super(AgentGraphRunStartedEvent.NAME, data);
    }
}
