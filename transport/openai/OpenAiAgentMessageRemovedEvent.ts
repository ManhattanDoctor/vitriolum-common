import { TransportEvent } from "@ts-core/common";
import { IOpenAiAgentEventDto } from "./IOpenAiAgentEventDto";

export class OpenAiAgentMessageRemovedEvent extends TransportEvent<IOpenAiAgentMessageRemovedEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'OpenAiAgentMessageRemovedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IOpenAiAgentMessageRemovedEventDto) {
        super(OpenAiAgentMessageRemovedEvent.NAME, data);
    }
}
export interface IOpenAiAgentMessageRemovedEventDto extends IOpenAiAgentEventDto {
    messageId: number;
}
