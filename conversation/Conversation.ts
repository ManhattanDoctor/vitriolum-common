import { Type } from 'class-transformer';
import * as _ from 'lodash';
import { AiConversationModel, AiModelConversationOptions } from '../ai';
import { Color } from '../color';
import { ConversationMessage } from './ConversationMessage';
import { File, IFileContentSearchOptions } from '../file';
import { User } from '../user';
import { ApiProperty, ApiPropertyOptional } from '@ts-core/swagger';

export enum ConversationStatus {
    ERROR = "ERROR",
    LOADED = "LOADED",
    LOADING = "LOADING",
}

export enum ConversationCommand {
    HISTORY_RESET = 'HISTORY_RESET'
}

export class Conversation {
    @ApiProperty({ description: 'Conversation ID' })
    public id: number;

    @ApiProperty({ description: 'Conversation name' })
    public name: string;

    @ApiProperty({ description: 'Conversation status', enum: ConversationStatus })
    public status: ConversationStatus;

    @ApiProperty({ description: 'Owner user ID' })
    public userId: number;

    @ApiProperty({ description: 'History message count' })
    public history: number;

    @ApiProperty({ description: 'Conversation picture URL' })
    public picture: string;

    @ApiProperty({ description: 'Whether to consider history in responses' })
    public isConsiderHistory: boolean;

    @ApiPropertyOptional({ description: 'Conversation tags', type: [String] })
    public tags?: Array<string>;

    public user?: User;

    @ApiPropertyOptional({ description: 'Conversation color', enum: Color })
    public color?: Color;

    @ApiPropertyOptional({ description: 'System prompt' })
    public system?: string;

    public messages?: Array<ConversationMessage>;

    @ApiPropertyOptional({ description: 'Last message date', type: Date })
    public lastMessageDate?: Date;

    @ApiPropertyOptional({ description: 'History reset date', type: Date })
    public historyResetDate?: Date;

    @ApiPropertyOptional({ description: 'File search options', type: 'object' })
    public fileSearchOptions?: IFileContentSearchOptions;

    @ApiPropertyOptional({ description: 'Attached files', type: [File] })
    @Type(() => File)
    public files?: Array<File>;

    @ApiProperty({ description: 'AI model used', enum: AiConversationModel })
    public model: AiConversationModel;

    @ApiProperty({ description: 'Model-specific options', type: 'object' })
    public options: AiModelConversationOptions;

    @ApiProperty({ description: 'Creation date', type: Date })
    @Type(() => Date)
    public createdDate: Date;
}

export const CONVERSATION_NAME_MIN_LENGTH = 2;
export const CONVERSATION_NAME_MAX_LENGTH = 64;

export const CONVERSATION_PICTURE_MIN_LENGTH = 2;
export const CONVERSATION_PICTURE_MAX_LENGTH = 1024;

export const CONVERSATION_SYSTEM_MAX_LENGTH = 128_000;

export const CONVERSATION_HISTORY_MIN = 3;
export const CONVERSATION_HISTORY_MAX = 256;

export const CONVERSATION_TAGS_MAX_LENGTH = 16;
