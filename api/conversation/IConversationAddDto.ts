
import { ITraceable } from '@ts-core/common';
import { Conversation } from '../../conversation';
import { AiConversationModel, AiModelConversationOptions } from '../../ai';
import { Color } from '../../color';

export interface IConversationAddDto extends ITraceable {
    name: string;
    model: AiConversationModel;
    options: AiModelConversationOptions;

    color?: Color;
    system?: string;
    history?: number;
    isConsiderHistory?: boolean;
}
export type IConversationAddDtoResponse = Conversation;