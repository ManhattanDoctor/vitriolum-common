import { McpServer } from '../../mcp';

export interface IMcpServerEditDto extends Partial<McpServer> {
    id: number;
    name?: string;
}

export type IMcpServerEditDtoResponse = McpServer;
