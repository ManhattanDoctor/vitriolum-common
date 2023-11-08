
import { ITraceable } from '@ts-core/common';
import { AiModel, AiModelDetails } from '../../ai';

export interface IAiModelGetDto extends ITraceable {
    name: AiModel;
}
export declare type IAiModelGetDtoResponse = AiModelDetails;
