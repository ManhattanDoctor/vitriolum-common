import { TransportEvent } from "@ts-core/common";
import { IConversationEventDto } from "./IConversationEventDto";

export class ConversationRemovedEvent extends TransportEvent<IConversationEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'ConversationRemovedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IConversationEventDto) {
        super(ConversationRemovedEvent.NAME, data);
    }
}