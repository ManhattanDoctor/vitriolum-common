import { TransportEvent } from "@ts-core/common";
import { IOpenAiAgentEventDto } from "./IOpenAiAgentEventDto";
import { OpenAiAgentMessage } from "../../ai/model/openai";

export class OpenAiAgentMessageAddedEvent extends TransportEvent<IOpenAiAgentMessageAddedEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'OpenAiAgentMessageAddedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IOpenAiAgentMessageAddedEventDto) {
        super(OpenAiAgentMessageAddedEvent.NAME, data);
    }
}
export interface IOpenAiAgentMessageAddedEventDto extends IOpenAiAgentEventDto {
    message: OpenAiAgentMessage;
}
