
import { TransformUtil, TransportHttp, ITransportHttpSettings, DateUtil, TraceUtil, ILogger } from '@ts-core/common';
import { IInitDto, IInitDtoResponse, ILoginDto, ILoginDtoResponse } from './login';
import { IUserGetDtoResponse, IUserEditDto, IUserEditDtoResponse } from './user';
import { User } from '../user';
import * as _ from 'lodash';

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

    constructor(logger: ILogger, url?: string) {
        super(logger, { method: 'get', baseURL: url, isHandleError: true, isHandleLoading: true, headers: {} });
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

    public async userGet(id: number): Promise<IUserGetDtoResponse> {
        let item = await this.call<User>(`${USER_URL}/${id}`);
        return TransformUtil.toClass(User, item);
    }

    public async userEdit(data: IUserEditDto): Promise<IUserEditDtoResponse> {
        let item = await this.call<IUserEditDtoResponse, IUserEditDto>(`${USER_URL}/${data.uid}`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(User, item);
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
}

const PREFIX = 'api/';

export const USER_URL = PREFIX + 'user';
export const OAUTH_URL = PREFIX + 'oauth';

export const INIT_URL = PREFIX + 'init';
export const LOGIN_URL = PREFIX + 'login';
export const LOGOUT_URL = PREFIX + 'logout';

