import { AgentGraphRunStatus } from "../../agent";
import { AnonymizeWarning } from "../../anonymize";

export interface IAgentGraphRunEventDto {
    session: string;
}

export interface IAgentGraphRunProgressEventDto extends IAgentGraphRunEventDto {
    uid: string;
    value: string;
    /** Файлы, созданные узлом: без них они появлялись бы только после перечитывания прогона */
    files?: Array<number>;
    /** Предупреждения анонимизации: автор графа видит их сразу, а не после перечитывания прогона */
    warnings?: Array<AnonymizeWarning>;
    /** Цена шага в рублях */
    cost?: string;
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
