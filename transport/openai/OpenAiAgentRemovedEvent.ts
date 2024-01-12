import { TransportEvent } from "@ts-core/common";
import { IOpenAiAgentEventDto } from "./IOpenAiAgentEventDto";

export class OpenAiAgentRemovedEvent extends TransportEvent<IOpenAiAgentEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'OpenAiAgentRemovedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IOpenAiAgentEventDto) {
        super(OpenAiAgentRemovedEvent.NAME, data);
    }
}