import { TransportEvent } from "@ts-core/common";
import { OpenAiAgent } from "../../ai/model/openai";

export class OpenAiAgentAddedEvent extends TransportEvent<OpenAiAgent>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'OpenAiAgentAddedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: OpenAiAgent) {
        super(OpenAiAgentAddedEvent.NAME, data);
    }
}