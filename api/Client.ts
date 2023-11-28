
import { TransformUtil, TransportHttp, ITransportHttpSettings, DateUtil, TraceUtil, ILogger, LoggerLevel, TransportCryptoManager } from '@ts-core/common';
import { IInitDto, IInitDtoResponse, ILoginDto, ILoginDtoResponse } from './login';
import { IUserGetDtoResponse, IUserEditDto, IUserEditDtoResponse, UserUID } from './user';
import { User } from '../user';
import * as _ from 'lodash';
import { LocaleProject } from './locale';
import { IOAuthPopUpDto } from '@ts-core/oauth';
import { IPersonAddDto, IPersonGetDto, IPersonGetDtoResponse, IPersonListDto, IPersonListDtoResponse } from './person';
import { Person } from '../lib/person';
import { IPersonTaskDto } from './person';
import { ITaskDto, ITaskDtoResponse, ITaskProgress, } from './task';
import { IAiModelGetDtoResponse, IAiModelGetDto } from './ai'
import { AI_MODEL_TIMEOUT } from '../ai';
import { AiTextTaskResponse, IAiTaskProgress } from '../ai/task';
import { IConversationAddDto, IConversationAddDtoResponse, IConversationGetDtoResponse, IConversationListDto, IConversationListDtoResponse, IConversationMessageAddDto, IConversationMessageAddDtoResponse, IConversationMessageListDto, IConversationMessageListDtoResponse } from './conversation';
import { Conversation, ConversationMessage } from '../lib/conversation';

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

    public async personRemove(uid: string): Promise<void> {
        return this.call<void, void>(`${PERSON_URL}/${uid}`, { method: 'delete' });
    }

    public async personList(data: IPersonListDto): Promise<IPersonListDtoResponse> {
        let item = await this.call<IPersonListDtoResponse, IPersonListDto>(PERSON_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Person, item.items);
        return item;
    }

    public async personTask(data: IPersonTaskDto): Promise<AiTextTaskResponse> {
        return this.call<AiTextTaskResponse, IPersonTaskDto>(PERSON_TASK_URL, { data: TraceUtil.addIfNeed(data), method: 'post' }, { timeout: AI_MODEL_TIMEOUT });
    }

    // --------------------------------------------------------------------------
    //
    //  Conversation Methods
    //
    // --------------------------------------------------------------------------

    public async conversationAdd(data: IConversationAddDto): Promise<IConversationAddDtoResponse> {
        let item = await this.call<IConversationAddDtoResponse, IConversationAddDto>(CONVERSATION_URL, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(Conversation, item);
    }

    public async conversationGet(id: number): Promise<IConversationGetDtoResponse> {
        let item = await this.call<IConversationGetDtoResponse>(`${CONVERSATION_URL}/${id}`);
        return TransformUtil.toClass(Conversation, item);
    }

    public async conversationRemove(id: number): Promise<void> {
        return this.call<void, void>(`${CONVERSATION_URL}/${id}`, { method: 'delete' });
    }

    public async conversationReload(id: number): Promise<void> {
        return this.call<void, void>(`${CONVERSATION_URL}/${id}/reload`, { method: 'post' });
    }

    public async conversationList(data: IConversationListDto): Promise<IConversationListDtoResponse> {
        let item = await this.call<IConversationListDtoResponse, IConversationListDto>(CONVERSATION_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Conversation, item.items);
        return item;
    }

    public async conversationMessageAdd(id: number, data: IConversationMessageAddDto): Promise<IConversationMessageAddDtoResponse> {
        let item = await this.call<IConversationMessageAddDtoResponse, IConversationMessageAddDto>(`${CONVERSATION_URL}/${id}/message`, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(ConversationMessage, item);
    }

    public async conversationMessageList(data: IConversationMessageListDto): Promise<IConversationMessageListDtoResponse> {
        let item = await this.call<IConversationMessageListDtoResponse, IConversationMessageListDto>(`${CONVERSATION_URL}/${data.conditions.conversationId}/message`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(ConversationMessage, item.items);
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  Task Methods
    //
    // --------------------------------------------------------------------------

    public async task<V extends ITaskDtoResponse>(data: ITaskDto): Promise<V> {
        return this.call<V, ITaskDto>(TASK_URL, { data: TraceUtil.addIfNeed(data), method: 'post' }, { timeout: AI_MODEL_TIMEOUT });
    }

    public async taskAbort(session: string, isHandleError: boolean = false): Promise<void> {
        return this.call<void, void>(`${TASK_URL}/${session}`, { method: 'delete', isHandleError });
    }

    public async taskProgress(session: string, isHandleError: boolean = false): Promise<IAiTaskProgress<ITaskProgress>> {
        return this.call<IAiTaskProgress<ITaskProgress>>(`${TASK_URL}/${session}`, { method: 'get', isHandleError });
    }

    // --------------------------------------------------------------------------
    //
    //  Ai Model
    //
    // --------------------------------------------------------------------------

    public async aiModelGet(data: IAiModelGetDto): Promise<IAiModelGetDtoResponse> {
        return this.call<IAiModelGetDtoResponse, IAiModelGetDto>(`${AI_MODEL_URL}/${data.name}`, { data: TraceUtil.addIfNeed(data) });
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

export const TASK_URL = PREFIX + 'task';
export const USER_URL = PREFIX + 'user';
export const OAUTH_URL = PREFIX + 'oauth';
export const LOCALE_URL = PREFIX + 'locale';
export const PERSON_URL = PREFIX + 'person';
export const AI_MODEL_URL = PREFIX + 'aimodel';
export const PERSON_TASK_URL = PREFIX + 'personTask';
export const CONVERSATION_URL = PREFIX + 'conversation';

export const INIT_URL = PREFIX + 'init';
export const LOGIN_URL = PREFIX + 'login';
export const LOGOUT_URL = PREFIX + 'logout';

