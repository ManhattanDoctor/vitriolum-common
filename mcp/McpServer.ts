import { Type } from 'class-transformer';
import { User } from '../user';

export class McpServer {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    public id: number;
    public uid: string;
    public name: string;
    public url: string;
    public status: McpServerStatus;

    public userId?: number;
    public headers?: Record<string, string>;
    public transport?: McpServerTransport;
    public description?: string;

    public user?: User;

    @Type(() => Date)
    public createdDate: Date;

    @Type(() => Date)
    public updatedDate?: Date;
}

export enum McpServerStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED'
}

export enum McpServerTransport {
    HTTP = 'http',
    SSE = 'sse'
}

export const MCP_SERVER_UID_MIN_LENGTH = 3;
export const MCP_SERVER_UID_MAX_LENGTH = 64;

export const MCP_SERVER_NAME_MIN_LENGTH = 3;
export const MCP_SERVER_NAME_MAX_LENGTH = 256;

export const MCP_SERVER_URL_MIN_LENGTH = 8;
export const MCP_SERVER_URL_MAX_LENGTH = 2048;

export const MCP_SERVER_DESCRIPTION_MAX_LENGTH = 1024;

/** The uid pattern: a system wide unique identifier used as a tool reference in the agent settings */
export const MCP_SERVER_UID_PATTERN = /^[A-Z][A-Z0-9_]*$/;
