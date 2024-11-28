
import { TransportHttp, TransformUtil, ILogger, LoggerLevel, TraceUtil } from '@ts-core/common';
import { IOAuthPopUpDto } from '@ts-core/oauth';
import { IInitDto, IInitDtoResponse, ILoginDto, ILoginDtoResponse } from './login';
import { IUserGetDtoResponse, IUserEditDto, IUserEditDtoResponse, UserUID, IUserListDto, IUserListDtoResponse } from './user';
import { ITaskDto, ITaskDtoResponse, ITaskProgress, } from './task';
import { IAiModelGetDtoResponse, IAiModelGetDto } from './ai'
import { IConversationAddDto, IConversationAddDtoResponse, IConversationEditDto, IConversationEditDtoResponse, IConversationGetDtoResponse, IConversationListDto, IConversationListDtoResponse, IConversationMessageAddDto, IConversationMessageAddDtoResponse, IConversationMessageListDto, IConversationMessageListDtoResponse } from './conversation';
import { IPaymentListDto, IPaymentListDtoResponse, IPaymentTransactionListDto, IPaymentTransactionListDtoResponse } from './payment';
import { CoinStatusGetDtoResponse, ICoinAccountsGetDto, ICoinBalanceEditDto, ICoinStatusGetDto } from './coin';
import { IFileBufferAddDto, IFileAddDtoResponse, IFileListDto, IFileListDtoResponse, IFileGetDto, IFileContentVectorSearchDtoResponse, IFileContentVectorSearchDto, IFileContentVectorSplitDtoResponse, IFileContentVectorGetDtoResponse } from './file';
import { IOpenAiAgentAddDto, IOpenAiAgentAddDtoResponse, IOpenAiAgentEditDto, IOpenAiAgentEditDtoResponse, IOpenAiAgentGetDtoResponse, IOpenAiAgentListDto, IOpenAiAgentListDtoResponse, IOpenAiAgentMessageAddDto, IOpenAiAgentMessageAddDtoResponse, IOpenAiAgentMessageListDto, IOpenAiAgentMessageListDtoResponse, IOpenAiAgentStatusDtoResponse, IOpenAiFileAddDto } from './openai';
import { OpenAiAgent, OpenAiAgentMessage } from '../ai/model/openai';
import { IFileContentVectorAddDto, IFileContentVectorSplitDto } from './file';
import { Conversation, ConversationMessage } from '../conversation';
import { Payment, PaymentTransaction } from '../payment';
import { AI_MODEL_TIMEOUT } from '../ai';
import { IAiTaskProgress } from '../ai/task';
import { File } from '../file';
import { User } from '../user';
import { IContentGetDto } from './content';
import * as _ from 'lodash';
import { IVoiceAddDto, IVoiceAddDtoResponse, IVoiceGetDto, IVoiceListDto, IVoiceListDtoResponse } from './voice';
import { Voice } from '../voice';
import { IToolConvertDto, IToolConvertDtoResponse } from './tool';

export class Client extends TransportHttp {

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

    public async userSearch(value: string): Promise<Array<User>> {
        let items = await this.call<Array<User>>(`${USER_SEARCH_URL}/${!_.isNil(value) ? value : ''}`);
        return TransformUtil.toClassMany(User, items);
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

    public async conversationEdit(data: IConversationEditDto): Promise<IConversationEditDtoResponse> {
        let item = await this.call<IConversationEditDtoResponse, IConversationEditDto>(`${CONVERSATION_URL}/${data.id}`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(Conversation, item);
    }

    public async conversationRemove(id: number): Promise<void> {
        return this.call<void, void>(`${CONVERSATION_URL}/${id}`, { method: 'delete' });
    }

    public async conversationCheck(id: number): Promise<void> {
        return this.call<void, void>(`${CONVERSATION_URL}/${id}/check`, { method: 'post' });
    }

    public async conversationClear(id: number): Promise<void> {
        return this.call<void, void>(`${CONVERSATION_URL}/${id}/clear`, { method: 'post' });
    }

    public async conversationCancel(id: number): Promise<void> {
        return this.call<void, void>(`${CONVERSATION_URL}/${id}/cancel`, { method: 'post' });
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

    public async conversationMessageList(data?: IConversationMessageListDto): Promise<IConversationMessageListDtoResponse> {
        let item = await this.call<IConversationMessageListDtoResponse, IConversationMessageListDto>(`${CONVERSATION_URL}/${data.conditions.conversationId}/message`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(ConversationMessage, item.items);
        return item;
    }

    public async conversationMessageRemove(id: number, messageId: number): Promise<void> {
        return this.call<void, void>(`${CONVERSATION_URL}/${id}/message/${messageId}`, { method: 'delete' });
    }

    //--------------------------------------------------------------------------
    //
    // 	Coin Methods
    //
    //--------------------------------------------------------------------------

    public async coinStatusGet(data?: ICoinStatusGetDto): Promise<CoinStatusGetDtoResponse> {
        let item = await this.call<CoinStatusGetDtoResponse>(`${COIN_URL}/status`, { data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(CoinStatusGetDtoResponse, item);
    }

    public async coinAccountsGet(uid: UserUID): Promise<ICoinAccountsGetDto> {
        return this.call<ICoinAccountsGetDto>(`${COIN_URL}/${uid}/accounts`);
    }

    public async coinBalanceEdit(data: ICoinBalanceEditDto): Promise<void> {
        return this.call<void, ICoinBalanceEditDto>(`${COIN_URL}/balance`, { data: TraceUtil.addIfNeed(data), method: 'post' });
    }

    //--------------------------------------------------------------------------
    //
    // 	Payment Methods
    //
    //--------------------------------------------------------------------------

    public async paymentList(data?: IPaymentListDto): Promise<IPaymentListDtoResponse> {
        let item = await this.call<IPaymentListDtoResponse, IPaymentListDto>(PAYMENT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Payment, item.items);
        return item;
    }

    public async paymentTransactionList(data?: IPaymentTransactionListDto): Promise<IPaymentTransactionListDtoResponse> {
        let item = await this.call<IPaymentTransactionListDtoResponse, IPaymentTransactionListDto>(PAYMENT_TRANSACTION_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(PaymentTransaction, item.items);
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  File Methods
    //
    // --------------------------------------------------------------------------

    public async voiceAdd(data: IVoiceAddDto): Promise<IVoiceAddDtoResponse> {
        let item = await this.call<IVoiceAddDtoResponse, IVoiceAddDto>(`${VOICE_URL}`, { data: TraceUtil.addIfNeed(data), method: 'post' });
        item = TransformUtil.toClass(Voice, item);
        return item;
    }

    public async voiceList(data?: IVoiceListDto): Promise<IVoiceListDtoResponse> {
        let item = await this.call<IVoiceListDtoResponse, IVoiceListDto>(`${VOICE_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Voice, item.items);
        return item;
    }

    public async voiceGet(id: number): Promise<IVoiceGetDto> {
        let item = await this.call<IVoiceGetDto, number>(`${VOICE_URL}/${id}`);
        return TransformUtil.toClass(Voice, item);
    }

    public async voiceRemove(id: number): Promise<void> {
        return this.call<void, number>(`${VOICE_URL}/${id}`, { method: 'delete' });
    }

    // --------------------------------------------------------------------------
    //
    //  File Methods
    //
    // --------------------------------------------------------------------------

    public async fileBufferAdd(data: IFileBufferAddDto): Promise<IFileAddDtoResponse> {
        let item = await this.call<IFileAddDtoResponse, IFileBufferAddDto>(`${FILE_BUFFER_URL}`, { data: TraceUtil.addIfNeed(data), method: 'post' });
        item = TransformUtil.toClass(File, item);
        return item;
    }

    public async fileList(data?: IFileListDto): Promise<IFileListDtoResponse> {
        let item = await this.call<IFileListDtoResponse, IFileListDto>(`${FILE_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(File, item.items);
        return item;
    }

    public async fileGet(id: number): Promise<IFileGetDto> {
        let item = await this.call<IFileGetDto, number>(`${FILE_URL}/${id}`);
        return TransformUtil.toClass(File, item);
    }

    public async fileRemove(id: number): Promise<void> {
        return this.call<void, number>(`${FILE_URL}/${id}`, { method: 'delete' });
    }

    public async fileContentVectorAdd(data: IFileContentVectorAddDto): Promise<void> {
        return this.call<void, IFileContentVectorAddDto>(`${FILE_CONTENT_VECTOR_URL}`, { method: 'post', data: TraceUtil.addIfNeed(data), timeout: AI_MODEL_TIMEOUT });
    }

    public async fileContentVectorGet(id: number): Promise<IFileContentVectorGetDtoResponse> {
        return this.call<IFileContentVectorGetDtoResponse, number>(`${FILE_CONTENT_VECTOR_URL}/${id}/content`, { method: 'get', timeout: AI_MODEL_TIMEOUT });
    }

    public async fileContentVectorSplit(data: IFileContentVectorSplitDto): Promise<IFileContentVectorSplitDtoResponse> {
        return this.call<IFileContentVectorSplitDtoResponse, IFileContentVectorSplitDto>(`${FILE_CONTENT_VECTOR_URL}/split`, { method: 'post', data: TraceUtil.addIfNeed(data), timeout: AI_MODEL_TIMEOUT });
    }

    public async fileContentVectorSearch(data: IFileContentVectorSearchDto): Promise<IFileContentVectorSearchDtoResponse> {
        return this.call<IFileContentVectorSearchDtoResponse, IFileContentVectorSearchDto>(`${FILE_CONTENT_VECTOR_URL}/search`, { data: TraceUtil.addIfNeed(data), timeout: AI_MODEL_TIMEOUT });
    }

    public async fileContentVectorRemove(id: number): Promise<void> {
        return this.call<void, number>(`${FILE_CONTENT_VECTOR_URL}/${id}`, { method: 'delete', timeout: AI_MODEL_TIMEOUT });
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

    //--------------------------------------------------------------------------
    //
    // 	Tool Methods
    //
    //--------------------------------------------------------------------------

    public async toolConvert<T = File | string>(data: IToolConvertDto): Promise<T> {
        let { output } = await this.call<IToolConvertDtoResponse<T>, IToolConvertDto>(`${TOOL_URL}/convert`, { data, method: 'post' });
        return !_.isString(output) ? TransformUtil.toClass(File, output) as T : output;
    }

    // --------------------------------------------------------------------------
    //
    //  OpenAi File
    //
    // --------------------------------------------------------------------------

    public async openAiFileAdd(data: IOpenAiFileAddDto): Promise<void> {
        return this.call<void, IOpenAiFileAddDto>(`${OPEN_AI_FILE_URL}/${data.id}`, { data: TraceUtil.addIfNeed(data), method: 'post', timeout: AI_MODEL_TIMEOUT });
    }

    public async openAiFileRemove(id: number): Promise<void> {
        return this.call<void, number>(`${OPEN_AI_FILE_URL}/${id}`, { method: 'delete', timeout: AI_MODEL_TIMEOUT });
    }

    // --------------------------------------------------------------------------
    //
    //  OpenAi Agent
    //
    // --------------------------------------------------------------------------

    public async openAiAgentAdd(data: IOpenAiAgentAddDto): Promise<IOpenAiAgentAddDtoResponse> {
        let item = await this.call<IOpenAiAgentAddDtoResponse, IOpenAiAgentAddDto>(OPEN_AI_AGENT_URL, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(OpenAiAgent, item);
    }

    public async openAiAgentGet(id: number): Promise<IOpenAiAgentGetDtoResponse> {
        let item = await this.call<IOpenAiAgentGetDtoResponse>(`${OPEN_AI_AGENT_URL}/${id}`);
        return TransformUtil.toClass(OpenAiAgent, item);
    }

    public async openAiAgentEdit(data: IOpenAiAgentEditDto): Promise<IOpenAiAgentEditDtoResponse> {
        let item = await this.call<IOpenAiAgentEditDtoResponse, IOpenAiAgentEditDto>(`${OPEN_AI_AGENT_URL}/${data.id}`, { method: 'put', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(OpenAiAgent, item);
    }

    public async openAiAgentStatus(id: number, timeout: number): Promise<IOpenAiAgentStatusDtoResponse> {
        return this.call<any, void>(`${OPEN_AI_AGENT_URL}/${id}/status`, { isHandleError: false, isHandleLoading: false });
    }

    public async openAiAgentRemove(id: number): Promise<void> {
        return this.call<void, void>(`${OPEN_AI_AGENT_URL}/${id}`, { method: 'delete' });
    }

    public async openAiAgentCheck(id: number): Promise<void> {
        return this.call<void, void>(`${OPEN_AI_AGENT_URL}/${id}/check`, { method: 'post' });
    }

    public async openAiAgentClear(id: number): Promise<void> {
        return this.call<void, void>(`${OPEN_AI_AGENT_URL}/${id}/clear`, { method: 'post' });
    }

    public async openAiAgentCancel(id: number): Promise<void> {
        return this.call<void, void>(`${OPEN_AI_AGENT_URL}/${id}/cancel`, { method: 'post' });
    }

    public async openAiAgentList(data: IOpenAiAgentListDto): Promise<IOpenAiAgentListDtoResponse> {
        let item = await this.call<IOpenAiAgentListDtoResponse, IOpenAiAgentListDto>(OPEN_AI_AGENT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(OpenAiAgent, item.items);
        return item;
    }

    public async openAiAgentMessageAdd(id: number, data: IOpenAiAgentMessageAddDto): Promise<IOpenAiAgentMessageAddDtoResponse> {
        let item = await this.call<IOpenAiAgentMessageAddDtoResponse, IOpenAiAgentMessageAddDto>(`${OPEN_AI_AGENT_URL}/${id}/message`, { method: 'post', data: TraceUtil.addIfNeed(data) });
        return TransformUtil.toClass(OpenAiAgentMessage, item);
    }

    public async openAiAgentMessageList(data: IOpenAiAgentMessageListDto): Promise<IOpenAiAgentMessageListDtoResponse> {
        let item = await this.call<IOpenAiAgentMessageListDtoResponse, IOpenAiAgentMessageListDto>(`${OPEN_AI_AGENT_URL}/${data.conditions.openAiAgentId}/message`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(OpenAiAgentMessage, item.items);
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  Management Methods
    //
    // --------------------------------------------------------------------------

    public async managementUserList(data?: IUserListDto): Promise<IUserListDtoResponse> {
        let item = await this.call<IUserListDtoResponse, IUserListDto>(`${MANAGEMENT_USER_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(User, item.items);
        return item;
    }

    public async managementFileList(data?: IFileListDto): Promise<IFileListDtoResponse> {
        let item = await this.call<IFileListDtoResponse, IFileListDto>(`${MANAGEMENT_FILE_URL}`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(File, item.items);
        return item;
    }

    public async managementConversationList(data?: IConversationListDto): Promise<IConversationListDtoResponse> {
        let item = await this.call<IConversationListDtoResponse, IConversationListDto>(MANAGEMENT_CONVERSATION_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Conversation, item.items);
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

    public async locale(project: string, locale: string, version?: string): Promise<any> {
        return this.call<any>(`${LOCALE_URL}/${project}/${locale}`, { data: { version } });
    }

    public async contentGet(idOrUrl: string | number): Promise<string> {
        return this.call<string, IContentGetDto>(`${CONTENT_URL}`, { data: { idOrUrl } });
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get sid(): string {
        return !_.isNil(this.authorization) ? this.authorization.substring(7) : null;
    }

    public set sid(value: string) {
        this.headers.Authorization = `Bearer ${value}`;
    }

    public get authorization(): string {
        return !_.isNil(this.headers.Authorization) ? this.headers.Authorization : null;
    }

    public get oauthRedirectUrl(): string {
        return `${this.url}${OAUTH_URL}`;
    }
}

const PREFIX = 'api/';

export const TOOL_URL = PREFIX + 'tool';
export const TASK_URL = PREFIX + 'task';
export const USER_URL = PREFIX + 'user';
export const OAUTH_URL = PREFIX + 'oauth';
export const VOICE_URL = PREFIX + 'voice';
export const LOCALE_URL = PREFIX + 'locale';
export const CONTENT_URL = PREFIX + 'content';
export const AI_MODEL_URL = PREFIX + 'aimodel';
export const CONVERSATION_URL = PREFIX + 'conversation';

export const USER_SEARCH_URL = PREFIX + 'userSearch';

export const FILE_URL = PREFIX + 'file';
export const FILE_BUFFER_URL = PREFIX + 'fileBuffer';
export const FILE_CONTENT_VECTOR_URL = PREFIX + 'fileContentVector';

export const OPEN_AI_FILE_URL = PREFIX + 'openAi/file';
export const OPEN_AI_AGENT_URL = PREFIX + 'openAi/agent';

export const COIN_URL = PREFIX + 'coin';
export const PAYMENT_URL = PREFIX + 'payment';
export const PAYMENT_TRANSACTION_URL = PREFIX + 'paymentTransaction';

export const INIT_URL = PREFIX + 'init';
export const LOGIN_URL = PREFIX + 'login';
export const LOGOUT_URL = PREFIX + 'logout';

export const MANAGEMENT_USER_URL = PREFIX + 'management/user';
export const MANAGEMENT_FILE_URL = PREFIX + 'management/file';
export const MANAGEMENT_CONVERSATION_URL = PREFIX + 'management/conversation';

