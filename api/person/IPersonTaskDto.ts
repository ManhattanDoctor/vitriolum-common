
import { ITaskDto } from '../task';
import { IAiTask } from '../../ai/task';
import { IPersonDto } from './IPersonDto';
import { AiModelTextOptions } from '../../ai';

export interface IPersonTaskDto extends ITaskDto<IPersonTextTask, AiModelTextOptions> { }

export interface IPersonTextTask extends IAiTask {
    person: IPersonDto;
    message: string;
    context?: string;
    example?: string;
}


export const PERSON_TASK_MESSAGE_MIN_LENGTH = 1;
export const PERSON_TASK_MESSAGE_MAX_LENGTH = 131136;

export const PERSON_TASK_CONTEXT_MIN_LENGTH = 4;
export const PERSON_TASK_CONTEXT_MAX_LENGTH = 8196;

export const PERSON_TASK_EXAMPLE_MIN_LENGTH = 4;
export const PERSON_TASK_EXAMPLE_MAX_LENGTH = 8196;

