import { TransportEvent } from "@ts-core/common";
import { IOpenAiAgentEventDto } from "./IOpenAiAgentEventDto";

export class OpenAiAgentClearedEvent extends TransportEvent<IOpenAiAgentEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'OpenAiAgentClearedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IOpenAiAgentEventDto) {
        super(OpenAiAgentClearedEvent.NAME, data);
    }
}