
import { ITraceable } from '@ts-core/common';
import { Conversation } from '../../lib/conversation';
import { AiConversationModel, AiModelConversationOptions } from '../../ai';

export interface IConversationAddDto extends ITraceable {
    name: string;
    model: AiConversationModel;
    options: AiModelConversationOptions;

    system?: string;
}
export type IConversationAddDtoResponse = Conversation;