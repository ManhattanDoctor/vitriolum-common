import { TransportEvent } from "@ts-core/common";
import { IOpenAiAgentEventDto } from "./IOpenAiAgentEventDto";

export class OpenAiAgentErroredEvent extends TransportEvent<IOpenAiAgentEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'OpenAiAgentErroredEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IOpenAiAgentEventDto) {
        super(OpenAiAgentErroredEvent.NAME, data);
    }
}
