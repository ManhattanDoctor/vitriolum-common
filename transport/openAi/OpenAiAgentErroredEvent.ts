import { ExtendedError, TransportEvent } from "@ts-core/common";
import { IOpenAiAgentEventDto } from "./IOpenAiAgentEventDto";

export class OpenAiAgentErroredEvent extends TransportEvent<IOpenAiAgentErroredEventDto>{
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

    constructor(data: IOpenAiAgentErroredEventDto) {
        super(OpenAiAgentErroredEvent.NAME, data);
    }
}
export interface IOpenAiAgentErroredEventDto extends IOpenAiAgentEventDto {
    error: ExtendedError;
}
