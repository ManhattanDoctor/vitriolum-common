import { Type } from 'class-transformer';
import { ConversationMessage } from './ConversationMessage';
import * as _ from 'lodash';

export class Conversation {
    id: number;
    role?: string;
    context?: string;

    @Type(() => ConversationMessage)
    messages: Array<ConversationMessage>;

    @Type(() => Date)
    createdDate: Date;
}