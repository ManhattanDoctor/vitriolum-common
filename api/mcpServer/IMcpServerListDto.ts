import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { McpServer } from '../../mcp';

export interface IMcpServerListDto extends IPaginable<McpServer>, ITraceable { }

export interface IMcpServerListDtoResponse extends IPagination<McpServer> { }
