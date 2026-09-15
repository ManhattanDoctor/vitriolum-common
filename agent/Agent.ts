import { Type } from 'class-transformer';
import { User } from '../user';
import { AiTextModel, AiModelTextOptions } from '../ai';

export class Agent {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    public id: number;
    public name: string;
    public userId: number;
    public model: AiTextModel;
    public options: AiModelTextOptions;

    public system?: string;
    public description?: string;
    /** Either an AiToolType value or an mcp server uid */
    public tools?: Array<string>;

    public user?: User;

    @Type(() => Date)
    public createdDate: Date;

    @Type(() => Date)
    public updatedDate?: Date;
}

export const AGENT_NAME_MIN_LENGTH = 3;
export const AGENT_NAME_MAX_LENGTH = 256;

export const AGENT_SYSTEM_MAX_LENGTH = 16384;
export const AGENT_DESCRIPTION_MAX_LENGTH = 1024;
