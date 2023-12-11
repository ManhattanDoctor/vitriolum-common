import { TransportEvent } from "@ts-core/common";
import { Conversation } from "../../conversation";

export class ConversationAddedEvent extends TransportEvent<Conversation>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'ConversationAddedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: Conversation) {
        super(ConversationAddedEvent.NAME, data);
    }
}