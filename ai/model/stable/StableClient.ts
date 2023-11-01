
import { TransportHttp, ITransportHttpSettings, ObjectUtil, ILogger, LoggerLevel } from '@ts-core/common';
import { IPingDtoResponse } from './IPingDto';
import { StreamDtoResponse } from './IStreamDto';
import { IRenderDto, IRenderDtoResponse } from './IRenderDto';
import * as _ from 'lodash';

export class StableClient extends TransportHttp<ITransportHttpSettings> {

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

    public async ping(): Promise<IPingDtoResponse> {
        return this.call<IPingDtoResponse>(PING_URL);
    }

    public async render(data: IRenderDto): Promise<IRenderDtoResponse> {
        return this.call<IRenderDtoResponse, IRenderDto>(RENDER_URL, { method: 'post', data });
    }

    public async stop(id: number): Promise<any> {
        return this.call(STOP_URL, { data: { task: id } });
    }

    public async stream(id: number): Promise<StreamDtoResponse> {
        let item = null;
        try {
            item = await this.call(`${STREAM_URL}/${id}`);
        }
        catch (error) {
            if (error.code !== 425) {
                throw error;
            }
        }
        if (_.isEmpty(item)) {
            return null;
        }
        if (!_.isString(item)) {
            return item;
        }
        item = `{${_.last(item.split('}{'))}`;
        return ObjectUtil.isJSON(item) ? JSON.parse(item) : null;
    }

    public getImageUrl(id: number, index: number): string {
        return `${this.url}${IMAGE_URL}/${id}/${index}`;
    }
}

const PREFIX = '/';

export const PING_URL = PREFIX + 'ping';
export const RENDER_URL = PREFIX + 'render';
export const IMAGE_URL = PREFIX + 'image/tmp';
export const STOP_URL = PREFIX + 'image/stop';
export const STREAM_URL = PREFIX + 'image/stream';

