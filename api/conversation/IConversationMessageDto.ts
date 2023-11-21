import { ITraceable } from '@ts-core/common';
import { AiModelOptions } from '../../ai';
import { ConversationMessage, ConversationMessageContent } from '../../lib/conversation';

export interface IConversationMessageDto extends ITraceable {
    content: ConversationMessageContent;
    options: AiModelOptions;
}
export type IConversationMessageDtoResponse = ConversationMessage;