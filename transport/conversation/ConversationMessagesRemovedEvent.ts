import { TransportEvent } from "@ts-core/common";
import { IConversationEventDto } from "./IConversationEventDto";

export class ConversationMessagesRemovedEvent extends TransportEvent<IConversationEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'ConversationMessagesRemovedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IConversationEventDto) {
        super(ConversationMessagesRemovedEvent.NAME, data);
    }
}