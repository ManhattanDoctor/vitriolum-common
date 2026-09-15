import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { AgentGraph } from '../../agent';

export interface IAgentGraphListDto extends IPaginable<AgentGraph>, ITraceable { }

export interface IAgentGraphListDtoResponse extends IPagination<AgentGraph> { }
