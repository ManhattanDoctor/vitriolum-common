import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { ConversationMessage } from '../../conversation';

export interface IConversationMessageListDto extends IPaginable<ConversationMessage>, ITraceable { }

export interface IConversationMessageListDtoResponse extends IPagination<ConversationMessage> { }
