import { ITraceable } from '@ts-core/common';
import { OpenAiFilePurpose } from '../../ai/model/openai';

export interface IOpenAiFileAddDto extends ITraceable {
    id: number;
    purpose: OpenAiFilePurpose;
}