
import { ITraceable } from '@ts-core/common';
import { IPersonDto } from './IPersonDto';
import { AiModel } from '../../ai';

export interface IPersonTaskDto extends ITraceable {
    task: PersonTask;
    model: AiModel;
    person: IPersonDto;
}

export type PersonTask = IPersonTextTaskDto | IPersonImageTaskDto;

export interface IPersonTextTaskDto {
    task: string;
    context?: string;
    example?: string;
}
export interface IPersonImageTaskDto {
    positivePrompt: string;
    negativePrompt?: string;
}
export declare type IPersonTaskDtoResponse = string;
