import { TransportEvent } from "@ts-core/common";
import { IAgentGraphRunAwaitingEventDto } from "./IAgentGraphRunEventDto";

export class AgentGraphRunAwaitingEvent extends TransportEvent<IAgentGraphRunAwaitingEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AgentGraphRunAwaitingEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IAgentGraphRunAwaitingEventDto) {
        super(AgentGraphRunAwaitingEvent.NAME, data);
    }
}
