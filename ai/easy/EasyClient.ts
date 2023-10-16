
import { TransportHttp, ITransportHttpSettings, ILogger, LoggerLevel } from '@ts-core/common';
import { IPingDtoResponse } from './IPingDto';
import { IStreamDto } from './IStreamDto';
import { IRenderDto, IRenderDtoResponse } from './IRenderDto';
import * as _ from 'lodash';

export class EasyClient extends TransportHttp<ITransportHttpSettings> {

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

    public async stream(id: string): Promise<IStreamDto> {
        return this.call<IStreamDto>(`${STREAM_URL}/${id}`);
    }

    // --------------------------------------------------------------------------
    //
    //  User Methods
    //
    // --------------------------------------------------------------------------

}

const PREFIX = '/';

export const PING_URL = PREFIX + 'ping';
export const RENDER_URL = PREFIX + 'render';
export const STREAM_URL = PREFIX + 'image/stream';

