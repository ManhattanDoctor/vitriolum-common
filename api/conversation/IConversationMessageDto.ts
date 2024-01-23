import { ITraceable } from '@ts-core/common';
import { ConversationMessage, ConversationMessageRole } from '../../conversation';

export interface IConversationMessageAddDto extends ITraceable {
    role: ConversationMessageRole;
    text: string;
    files?: Array<number>;
    history?: number;
}

export type IConversationMessageAddDtoResponse = ConversationMessage;