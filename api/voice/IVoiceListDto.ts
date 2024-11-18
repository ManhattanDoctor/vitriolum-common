import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { Voice } from '../../voice';

export interface IVoiceListDto extends IPaginable<Voice>, ITraceable { }

export interface IVoiceListDtoResponse extends IPagination<Voice> { }
