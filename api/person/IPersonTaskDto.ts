
import { ITraceable } from '@ts-core/common';
import { IPersonDto } from './IPersonDto';

export interface IPersonTaskDto extends ITraceable {
    task: string;
    person: IPersonDto;
    context?: string;
    example?: string;
}
export declare type IPersonTaskDtoResponse = string;
