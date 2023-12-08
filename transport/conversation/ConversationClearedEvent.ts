import { TransportEvent } from "@ts-core/common";
import { IConversationEventDto } from "./IConversationEventDto";

export class ConversationClearedEvent extends TransportEvent<IConversationEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'ConversationClearedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IConversationEventDto) {
        super(ConversationClearedEvent.NAME, data);
    }
}