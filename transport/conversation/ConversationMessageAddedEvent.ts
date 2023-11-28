import { TransportEvent } from "@ts-core/common";
import { IConversationEventDto } from "./IConversationEventDto";
import { ConversationMessage } from "../../lib/conversation";

export class ConversationMessageAddedEvent extends TransportEvent<IConversationMessageAddedEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'ConversationMessageAddedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IConversationMessageAddedEventDto) {
        super(ConversationMessageAddedEvent.NAME, data);
    }
}
export interface IConversationMessageAddedEventDto extends IConversationEventDto {
    message: ConversationMessage;
}
