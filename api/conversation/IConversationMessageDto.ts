import { ITraceable } from '@ts-core/common';
import { ConversationMessage } from '../../conversation';

export interface IConversationMessageAddDto extends ITraceable {
    value: string;
    files?: Array<number>;
    window?: number;
}

export type IConversationMessageAddDtoResponse = ConversationMessage;