
import { ITraceable } from '@ts-core/common';
import { IPersonDto } from '../person';
import { Conversation } from '../../lib/conversation';
import { IConversationMessageDto } from './IConversationMessageDto';

export interface IConversationAddDto extends ITraceable {
    name: string;

    role?: string;
    context?: string;

    person?: IPersonDto,
    voiceId?: number;

    message?: IConversationMessageDto;
}
export type IConversationAddDtoResponse = Conversation;
