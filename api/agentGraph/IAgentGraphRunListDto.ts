import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { AgentGraphRun } from '../../agent';

export interface IAgentGraphRunListDto extends IPaginable<AgentGraphRun>, ITraceable { }

export interface IAgentGraphRunListDtoResponse extends IPagination<AgentGraphRun> { }

export type IAgentGraphRunGetDtoResponse = AgentGraphRun;
