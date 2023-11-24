import { ITraceable } from '@ts-core/common';
import { ConversationMessage } from '../../lib/conversation';

export interface IConversationMessageAddDto extends ITraceable {
    value: string;
    files?: Array<number>;
}

export type IConversationMessageAddDtoResponse = ConversationMessage;