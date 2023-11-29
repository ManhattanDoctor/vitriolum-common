import { IConversationAddDto } from './IConversationAddDto';
import { Conversation } from '../../lib/conversation';

export interface IConversationEditDto extends Partial<IConversationAddDto> { }

export type IConversationEditDtoResponse = Conversation;