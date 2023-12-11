import { ExtendedError, TransportEvent } from "@ts-core/common";
import { IConversationEventDto } from "./IConversationEventDto";

export class ConversationErroredEvent extends TransportEvent<IConversationErroredEventDto>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'ConversationErroredEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(data: IConversationErroredEventDto) {
        super(ConversationErroredEvent.NAME, data);
    }
}
export interface IConversationErroredEventDto extends IConversationEventDto {
    error: ExtendedError;
}
