import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { OpenAiAgentMessage } from '../../ai/model/openai';

export interface IOpenAiAgentMessageListDto extends IPaginable<OpenAiAgentMessage>, ITraceable { }

export interface IOpenAiAgentMessageListDtoResponse extends IPagination<OpenAiAgentMessage> { }
