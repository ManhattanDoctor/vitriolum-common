import { TransportEvent } from "@ts-core/common";
import { AgentGraph } from "../../agent";
import { IAgentGraphEventDto } from "./IAgentGraphEventDto";

export class AgentGraphChangedEvent extends TransportEvent<IAgentGraphChangedEventDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'AgentGraphChangedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IAgentGraphChangedEventDto) {
        super(AgentGraphChangedEvent.NAME, data);
    }
}

export interface IAgentGraphChangedEventDto extends IAgentGraphEventDto {
    item: Partial<AgentGraph>;
}
