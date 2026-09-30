import { Type } from 'class-transformer';
import { User } from '../user';
import { ApiProperty, ApiPropertyOptional } from '@ts-core/swagger';

// Перечисления объявлены раньше McpServer: декораторы Swagger читают их при загрузке модуля

export enum McpServerStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED'
}

export enum McpServerTransport {
    HTTP = 'http',
    SSE = 'sse'
}

export class McpServer {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    @ApiProperty({ description: 'MCP server ID' })
    public id: number;
    @ApiProperty({ description: 'Unique identifier used as a tool reference in agents' })
    public uid: string;
    @ApiProperty({ description: 'MCP server name' })
    public name: string;
    @ApiProperty({ description: 'Server URL, returned to administrators only' })
    public url: string;
    @ApiProperty({ description: 'MCP server status', enum: McpServerStatus })
    public status: McpServerStatus;

    @ApiPropertyOptional({ description: 'Owner user ID' })
    public userId?: number;
    @ApiPropertyOptional({ description: 'Request headers, returned to administrators only', type: Object })
    public headers?: Record<string, string>;
    @ApiPropertyOptional({ description: 'Transport', enum: McpServerTransport })
    public transport?: McpServerTransport;
    @ApiPropertyOptional({ description: 'MCP server description' })
    public description?: string;

    public user?: User;

    @ApiProperty({ description: 'Creation date', type: Date })
    @Type(() => Date)
    public createdDate: Date;

    @ApiPropertyOptional({ description: 'Last update date', type: Date })
    @Type(() => Date)
    public updatedDate?: Date;
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
