import { ITraceable } from '@ts-core/common';
import { ConversationMessage, ConversationMessageContent } from '../../lib/conversation';

export interface IConversationMessageDto extends ITraceable {
    id: number;
    contents: Array<ConversationMessageContent>;
}
export type IConversationMessageDtoResponse = ConversationMessage;