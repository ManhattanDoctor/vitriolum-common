
import { TransformUtil, TransportHttp, ITransportHttpSettings, DateUtil, TraceUtil, ILogger, LoggerLevel } from '@ts-core/common';
import { IInitDto, IInitDtoResponse, ILoginDto, ILoginDtoResponse } from './login';
import { IUserGetDtoResponse, IUserEditDto, IUserEditDtoResponse, UserUID } from './user';
import { User } from '../user';
import * as _ from 'lodash';
import { LocaleProject } from './locale';
import { IOAuthPopUpDto } from '@ts-core/oauth';
import { IPersonAddDto, IPersonGetDto, IPersonGetDtoResponse, IPersonListDto, IPersonListDtoResponse } from './person';
import { Person } from '../lib/person';

export class Client extends TransportHttp<ITransportHttpSettings> {
    // --------------------------------------------------------------------------
    //
    //  Static Methods
    //
    // --------------------------------------------------------------------------

    public static totp(): Promise<string> {
        let window = 5 * DateUtil.MILLISECONDS_MINUTE;
        return Promise.resolve(`Login data is "${Math.floor(Date.now() / window)}"`);
    }

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: ILogger, url?: string, level?: LoggerLevel) {
        super(logger, { method: 'get', isHandleError: true, isHandleLoading: true, headers: {} });

        if (!_.isNil(url)) {
            this.url = url;
        }
        if (!_.isNil(level)) {
            this.level = level;
        }
    }

    // --------------------------------------------------------------------------
    //
    //  Auth Methods
    //
    // --------------------------------------------------------------------------

    public async login(data: ILoginDto): Promise<ILoginDtoResponse> {
        return this.call<ILoginDtoResponse, ILoginDto>(LOGIN_URL, { data: TraceUtil.addIfNeed(data), method: 'post' });
    }

    public async init(data?: IInitDto): Promise<IInitDtoResponse> {
        let item = await this.call<IInitDtoResponse, IInitDto>(INIT_URL, { data: TraceUtil.addIfNeed(data) });
        item.user = TransformUtil.toClass(User, item.user);
        return item;
    }

    public async logout(traceId?: string): Promise<void> {
        // return this.call<void, ITraceable>(LOGOUT_URL, { data: TraceUtil.addIfNeed({ traceId }), method: 'post' });
    }

    // --------------------------------------------------------------------------
    //
    //  User Methods
    //
    // --------------------------------------------------------------------------

    public async userGet(uid: UserUID): Promise<IUserGetDtoResponse> {
        let item = await this.call<IUserGetDtoResponse>(`${USER_URL}/${uid}`);
        return TransformUtil.toClass(User, item);
    }

    public async userEdit(data: IUserEditDto): Promise<IUserEditDtoResponse> {
        let item = await this.call<IUserEditDtoResponse, IUserEditDto>(`${USER_URL}/${data.uid}`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(User, item);
    }

    // --------------------------------------------------------------------------
    //
    //  Person Methods
    //
    // --------------------------------------------------------------------------

    public async personAdd(data: IPersonAddDto): Promise<IPersonGetDtoResponse> {
        let item = await this.call<IPersonGetDtoResponse, IPersonAddDto>(PERSON_URL, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(Person, item);
    }

    public async personGet(uid: string, data?: IPersonGetDto): Promise<IPersonGetDtoResponse> {
        let item = await this.call<IPersonGetDtoResponse, IPersonGetDto>(`${PERSON_URL}/${uid}`, { data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(Person, item);
    }

    public async personList(data: IPersonListDto): Promise<IPersonListDtoResponse> {
        let item = await this.call<IPersonListDtoResponse, IPersonListDto>(PERSON_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Person, item.items);
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  Other Methods
    //
    // --------------------------------------------------------------------------

    public async oauth(state: string): Promise<IOAuthPopUpDto> {
        return this.call<IOAuthPopUpDto>(`${OAUTH_URL}/${state}`, { data: TraceUtil.addIfNeed({}) });
    }

    public async locale(project: LocaleProject, locale: string, version?: string): Promise<any> {
        return this.call<any>(`${LOCALE_URL}/${project}/${locale}`, { data: { version } });
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public set sid(value: string) {
        if (!_.isNil(this.headers)) {
            this.headers.Authorization = `Bearer ${value}`;
        }
    }

    public get oauthRedirectUrl(): string {
        return `${this.url}${OAUTH_URL}`;
    }
}

const PREFIX = 'api/';

export const USER_URL = PREFIX + 'user';
export const OAUTH_URL = PREFIX + 'oauth';
export const LOCALE_URL = PREFIX + 'locale';
export const PERSON_URL = PREFIX + 'person';

export const INIT_URL = PREFIX + 'init';
export const LOGIN_URL = PREFIX + 'login';
export const LOGOUT_URL = PREFIX + 'logout';

