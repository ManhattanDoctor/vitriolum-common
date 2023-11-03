
import { ITaskDto } from '../task';
import { IAiTextTask } from '../../ai/task';
import { IPersonDto } from './IPersonDto';
import { IAiModelTextOptions } from '../../ai';

export interface IPersonTaskDto extends ITaskDto<IAiTextTask, IAiModelTextOptions> {
    person: IPersonDto;
}
