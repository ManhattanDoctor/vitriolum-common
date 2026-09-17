import { AgentGraphRunStatus } from "../../agent";

export interface IAgentGraphRunEventDto {
    session: string;
}

export interface IAgentGraphRunProgressEventDto extends IAgentGraphRunEventDto {
    uid: string;
    value: string;
    /** Файлы, созданные узлом: без них они появлялись бы только после перечитывания прогона */
    files?: Array<number>;
}

export interface IAgentGraphRunAwaitingEventDto extends IAgentGraphRunEventDto {
    uid: string;
    value: string;
}

export interface IAgentGraphRunFinishedEventDto extends IAgentGraphRunEventDto {
    status: AgentGraphRunStatus;

    output?: string;
    error?: string;
}
