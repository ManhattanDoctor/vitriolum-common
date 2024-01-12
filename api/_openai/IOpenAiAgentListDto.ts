import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { OpenAiAgent } from '../../ai/model/openai';

export interface IOpenAiAgentListDto extends IPaginable<OpenAiAgent>, ITraceable { }

export interface IOpenAiAgentListDtoResponse extends IPagination<OpenAiAgent> { }
