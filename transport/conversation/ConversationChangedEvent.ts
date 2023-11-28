import { TransportEvent } from "@ts-core/common";
import { IConversationEventDto } from "./IConversationEventDto";
import { ConversationStatus } from "../../lib/conversation";

export class ConversationChangedEvent extends TransportEvent<IConversationChangedEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'ConversationChangedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IConversationChangedEventDto) {
        super(ConversationChangedEvent.NAME, data);
    }
}
export interface IConversationChangedEventDto extends IConversationEventDto {
    status: ConversationStatus;
}