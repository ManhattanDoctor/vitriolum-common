
import { ITraceable } from '@ts-core/common';
import { Conversation } from '../../lib/conversation';
import { IConversationMessageAddDto } from './IConversationMessageDto';

export interface IConversationAddDto extends ITraceable {
    name: string;
    system?: string;
    message?: IConversationMessageAddDto;
}
export type IConversationAddDtoResponse = Conversation;