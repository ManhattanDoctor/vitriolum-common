
import { ITraceable } from '@ts-core/common';
import { Conversation } from '../../lib/conversation';
import { IConversationMessageDto } from './IConversationMessageDto';

export interface IConversationAddDto extends ITraceable {
    name: string;
    role?: string;
    context?: string;
    message?: IConversationMessageDto;
}
export type IConversationAddDtoResponse = Conversation;
