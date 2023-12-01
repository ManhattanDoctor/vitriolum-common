import { IConversationAddDto } from './IConversationAddDto';
import { Conversation } from '../../conversation';

export interface IConversationEditDto extends Partial<IConversationAddDto> {
    id: number;
}

export type IConversationEditDtoResponse = Conversation;