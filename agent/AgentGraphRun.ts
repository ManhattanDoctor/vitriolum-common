import { Type } from 'class-transformer';
import { User } from '../user';
import { AgentGraph } from './AgentGraph';
import { IAiTextConsumption } from '../ai/model';
import { AnonymizeWarning } from '../anonymize';
import { ApiProperty, ApiPropertyOptional } from '@ts-core/swagger';

// Статус и шаг объявлены раньше AgentGraphRun: декораторы Swagger читают их при загрузке модуля

export enum AgentGraphRunStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    AWAITING = 'AWAITING',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
    ERROR = 'ERROR'
}

export class AgentGraphRunStep {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    @ApiProperty({ description: 'UID of the node that made the step' })
    public uid: string;
    @ApiProperty({ description: 'Answer of the node' })
    public value: string;
    /** Файлы, созданные этим узлом: иначе видна лишь общая куча прогона, без того, кто её сделал */
    @ApiPropertyOptional({ description: 'Files created by the node', type: [Number] })
    public files?: Array<number>;
    @ApiPropertyOptional({ description: 'Warnings of the anonymize service about the step', type: [AnonymizeWarning] })
    public warnings?: Array<AnonymizeWarning>;
    @ApiPropertyOptional({ description: 'Tokens and tools spent by the node', type: Object })
    public consumption?: IAiTextConsumption;
    @ApiPropertyOptional({ description: 'Cost of the step in rubles' })
    public cost?: string;

    @ApiProperty({ description: 'Step date', type: Date })
    @Type(() => Date)
    public date: Date;
}

export class AgentGraphRun {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    @ApiProperty({ description: 'Run ID' })
    public id: number;
    @ApiProperty({ description: 'Run session UUID' })
    public session: string;
    @ApiProperty({ description: 'Run status', enum: AgentGraphRunStatus })
    public status: AgentGraphRunStatus;
    @ApiProperty({ description: 'Graph ID' })
    public graphId: number;
    @ApiProperty({ description: 'Owner user ID' })
    public userId: number;

    @ApiPropertyOptional({ description: 'Input text of the run' })
    public input?: string;
    @ApiPropertyOptional({ description: 'Result of the run' })
    public output?: string;
    @ApiPropertyOptional({ description: 'Error message when the run failed' })
    public error?: string;
    @ApiPropertyOptional({ description: 'All files of the run', type: [Number] })
    public files?: Array<number>;
    /** Файлы, приложенные человеком при запуске: остальные создали узлы прогона */
    @ApiPropertyOptional({ description: 'Files attached at start', type: [Number] })
    public inputFiles?: Array<number>;
    /** Предел расхода, заданный при запуске, в рублях */
    public maxCost?: string;
    @ApiPropertyOptional({ description: 'Steps of the run', type: [AgentGraphRunStep] })
    public steps?: Array<AgentGraphRunStep>;
    @ApiPropertyOptional({ description: 'Tokens and cost spent by the run', type: Object })
    public consumption?: IAiTextConsumption;

    @ApiPropertyOptional({ description: 'Graph of the run' })
    public graph?: AgentGraph;
    public user?: User;

    @ApiProperty({ description: 'Creation date', type: Date })
    @Type(() => Date)
    public createdDate: Date;

    @ApiPropertyOptional({ description: 'Finish date', type: Date })
    @Type(() => Date)
    public finishedDate?: Date;
}
