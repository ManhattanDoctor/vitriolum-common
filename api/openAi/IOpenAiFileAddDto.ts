import { ITraceable } from '@ts-core/common';
import { OpenAiFilePurpose } from '../../ai/model/openai';
import { File } from '../../file';

export interface IOpenAiFileAddDto extends ITraceable {
    id: number;
    purpose: OpenAiFilePurpose;
}
export type IOpenAiFileAddDtoResponse = File;
