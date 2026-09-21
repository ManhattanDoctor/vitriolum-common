import { TransportEvent } from "@ts-core/common";
import { Agent } from "../../agent";

export class AgentAddedEvent extends TransportEvent<Agent> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AgentAddedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: Agent) {
        super(AgentAddedEvent.NAME, data);
    }
}
