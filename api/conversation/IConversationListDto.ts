import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { Conversation } from '../../conversation';

export interface IConversationListDto extends IPaginable<Conversation>, ITraceable { }

export interface IConversationListDtoResponse extends IPagination<Conversation> { }
