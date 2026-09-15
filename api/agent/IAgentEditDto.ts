import { Agent } from '../../agent';

export interface IAgentEditDto extends Partial<Agent> {
    id: number;
    name?: string;
}

export type IAgentEditDtoResponse = Agent;
