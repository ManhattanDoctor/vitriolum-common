
import { ITraceable } from '@ts-core/common';
import { Conversation } from '../../conversation';
import { AiConversationModel, AiModelConversationOptions } from '../../ai';
import { Color } from '../../color';
import { IFileContentSearchOptions } from '../../file';

export interface IConversationAddDto extends ITraceable {
    name: string;
    model: AiConversationModel;
    options: AiModelConversationOptions;

    userId?: number;

    tags?: Array<string>;
    color?: Color;
    files?: Array<number>;
    system?: string;
    history?: number;
    fileSearchOptions?: IFileContentSearchOptions;
    isConsiderHistory?: boolean;
}
export type IConversationAddDtoResponse = Conversation;