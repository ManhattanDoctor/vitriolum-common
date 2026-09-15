import { ITraceable } from '@ts-core/common';
import { AgentGraphRun } from '../../agent';

export interface IAgentGraphRunDto extends ITraceable {
    input: string;
    session?: string;
}

export type IAgentGraphRunDtoResponse = AgentGraphRun;

export interface IAgentGraphResumeDto extends ITraceable {
    value: string;
    isApproved: boolean;
}

export type IAgentGraphResumeDtoResponse = AgentGraphRun;
