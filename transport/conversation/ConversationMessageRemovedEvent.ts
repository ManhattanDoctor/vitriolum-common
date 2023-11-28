import { TransportEvent } from "@ts-core/common";
import { IConversationEventDto } from "./IConversationEventDto";

export class ConversationMessageRemovedEvent extends TransportEvent<IConversationMessageRemovedEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'ConversationMessageRemovedEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IConversationMessageRemovedEventDto) {
        super(ConversationMessageRemovedEvent.NAME, data);
    }
}
export interface IConversationMessageRemovedEventDto extends IConversationEventDto {
    messageId: number;
}
