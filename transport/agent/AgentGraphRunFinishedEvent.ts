import { TransportEvent } from "@ts-core/common";
import { IAgentGraphRunFinishedEventDto } from "./IAgentGraphRunEventDto";

export class AgentGraphRunFinishedEvent extends TransportEvent<IAgentGraphRunFinishedEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AgentGraphRunFinishedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IAgentGraphRunFinishedEventDto) {
        super(AgentGraphRunFinishedEvent.NAME, data);
    }
}
