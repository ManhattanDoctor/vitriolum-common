
import { ITaskDto } from '../task';
import { IAiTextTask } from '../../ai/task';
import { IPersonDto } from './IPersonDto';
import { AiModelTextOptions } from '../../ai';

export interface IPersonTaskDto extends ITaskDto<IAiTextTask, AiModelTextOptions> {
    person: IPersonDto;
}
