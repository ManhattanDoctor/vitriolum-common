import { ITextTaskDto } from '../task';
import { ITaskDto } from '../task';
import { IPersonDto } from './IPersonDto';

export interface IPersonTaskDto extends ITaskDto<ITextTaskDto> {
    person: IPersonDto;
}
