
import { ITaskDto } from '../task';
import { IAiTextTask } from '../../ai/task';
import { IPersonDto } from './IPersonDto';

export interface IPersonTaskDto extends ITaskDto<IAiTextTask> {
    person: IPersonDto;
}
