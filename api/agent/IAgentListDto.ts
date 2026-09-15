import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { Agent } from '../../agent';

export interface IAgentListDto extends IPaginable<Agent>, ITraceable { }

export interface IAgentListDtoResponse extends IPagination<Agent> { }
