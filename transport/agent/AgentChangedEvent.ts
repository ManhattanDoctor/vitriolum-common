import { TransportEvent } from "@ts-core/common";
import { Agent } from "../../agent";
import { IAgentEventDto } from "./IAgentEventDto";

export class AgentChangedEvent extends TransportEvent<IAgentChangedEventDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AgentChangedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IAgentChangedEventDto) {
        super(AgentChangedEvent.NAME, data);
    }
}

export interface IAgentChangedEventDto extends IAgentEventDto {
    item: Partial<Agent>;
}
