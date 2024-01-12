import { TransportEvent } from "@ts-core/common";
import { IOpenAiAgentEventDto } from "./IOpenAiAgentEventDto";
import { OpenAiAgent } from "../../ai/model/openAi";

export class OpenAiAgentChangedEvent extends TransportEvent<IOpenAiAgentChangedEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'OpenAiAgentChangedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IOpenAiAgentChangedEventDto) {
        super(OpenAiAgentChangedEvent.NAME, data);
    }
}
export interface IOpenAiAgentChangedEventDto extends IOpenAiAgentEventDto {
    item: Partial<OpenAiAgent>;
}
