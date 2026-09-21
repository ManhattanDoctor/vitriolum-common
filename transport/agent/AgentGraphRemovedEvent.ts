import { TransportEvent } from "@ts-core/common";
import { IAgentGraphEventDto } from "./IAgentGraphEventDto";

export class AgentGraphRemovedEvent extends TransportEvent<IAgentGraphEventDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AgentGraphRemovedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IAgentGraphEventDto) {
        super(AgentGraphRemovedEvent.NAME, data);
    }
}
