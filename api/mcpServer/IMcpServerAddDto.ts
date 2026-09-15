import { ITraceable } from '@ts-core/common';
import { McpServer, McpServerTransport } from '../../mcp';

export interface IMcpServerAddDto extends ITraceable {
    uid: string;
    name: string;
    url: string;

    headers?: Record<string, string>;
    transport?: McpServerTransport;
    description?: string;
}

export type IMcpServerAddDtoResponse = McpServer;
