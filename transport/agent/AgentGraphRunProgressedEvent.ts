import { TransportEvent } from "@ts-core/common";
import { IAgentGraphRunProgressEventDto } from "./IAgentGraphRunEventDto";

export class AgentGraphRunProgressedEvent extends TransportEvent<IAgentGraphRunProgressEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AgentGraphRunProgressedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IAgentGraphRunProgressEventDto) {
        super(AgentGraphRunProgressedEvent.NAME, data);
    }
}
