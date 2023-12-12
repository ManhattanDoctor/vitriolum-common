
import { ITraceable } from '@ts-core/common';
import { Conversation, ConversationColor } from '../../conversation';
import { AiConversationModel, AiModelConversationOptions } from '../../ai';

export interface IConversationAddDto extends ITraceable {
    name: string;
    model: AiConversationModel;
    options: AiModelConversationOptions;

    color?: ConversationColor;
    system?: string;
    history?: number;
    isConsiderHistory?: boolean;
}
export type IConversationAddDtoResponse = Conversation;