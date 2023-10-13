
import { TransportHttp, ITransportHttpSettings, ILogger, LoggerLevel } from '@ts-core/common';
import * as _ from 'lodash';
import { IPingDtoResponse } from './IPingDto';

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

    public async ping(data: string): Promise<IPingDtoResponse> {
        return this.call<IPingDtoResponse>(PING_URL, {});
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
export const IMAGE_STREAM_URL = PREFIX + 'image/stream';

