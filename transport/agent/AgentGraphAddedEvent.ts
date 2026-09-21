import { TransportEvent } from "@ts-core/common";
import { AgentGraph } from "../../agent";

export class AgentGraphAddedEvent extends TransportEvent<AgentGraph> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AgentGraphAddedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: AgentGraph) {
        super(AgentGraphAddedEvent.NAME, data);
    }
}
