import { Type } from 'class-transformer';
import { User } from '../user';
import { AgentGraph } from './AgentGraph';
import { IAiTextConsumption } from '../ai/model';

export class AgentGraphRun {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    public id: number;
    public session: string;
    public status: AgentGraphRunStatus;
    public graphId: number;
    public userId: number;

    public input?: string;
    public output?: string;
    public error?: string;
    public files?: Array<number>;
    /** Файлы, приложенные человеком при запуске: остальные создали узлы прогона */
    public inputFiles?: Array<number>;
    public steps?: Array<AgentGraphRunStep>;
    public consumption?: IAiTextConsumption;

    public graph?: AgentGraph;
    public user?: User;

    @Type(() => Date)
    public createdDate: Date;

    @Type(() => Date)
    public finishedDate?: Date;
}

export class AgentGraphRunStep {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    public uid: string;
    public value: string;
    /** Файлы, созданные этим узлом: иначе видна лишь общая куча прогона, без того, кто её сделал */
    public files?: Array<number>;

    @Type(() => Date)
    public date: Date;
}

export enum AgentGraphRunStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    AWAITING = 'AWAITING',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
    ERROR = 'ERROR'
}
