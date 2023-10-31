import { ITaskDto, Task } from '../task';
import { IPersonDto } from './IPersonDto';

export interface IPersonTaskDto<T extends Task> extends ITaskDto<T> {
    person: IPersonDto;
}

export declare type IPersonTaskDtoResponse = string;
