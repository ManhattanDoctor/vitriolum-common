import { ITraceable, IPaginable, IPagination } from '@ts-core/common';
import { Person } from '../../lib/person';

export interface IPersonListDto extends IPaginable<Person>, ITraceable { }

export interface IPersonListDtoResponse extends IPagination<Person> { }