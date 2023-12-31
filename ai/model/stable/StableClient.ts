
import { TransportHttp, ITransportHttpSettings, ObjectUtil, ILogger, LoggerLevel, RandomUtil, ExtendedError } from '@ts-core/common';
import { IPingDtoResponse } from './IPingDto';
import { StreamDtoResponse } from './IStreamDto';
import { IRenderDto, IRenderDtoResponse } from './IRenderDto';
import * as _ from 'lodash';
import { IStreamProgress } from './IStreamDto';
import { IStreamResult } from './IStreamDto';
import { IStableImageModelDetails } from './IStableImage';

export class StableClient extends TransportHttp<ITransportHttpSettings> {

    // --------------------------------------------------------------------------
    //
    //  Static Methods
    //
    // --------------------------------------------------------------------------

    public static isStreamResult(item: any): item is IStreamResult {
        return ObjectUtil.hasOwnProperties(item, ['status']);
    }

    public static isStreamProgress(item: any): item is IStreamProgress {
        return ObjectUtil.hasOwnProperties(item, ['step', 'total_steps'])
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
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    private parseStream(item: any): StreamDtoResponse {
        if (_.isEmpty(item)) {
            return null;
        }
        if (!_.isString(item)) {
            return this.parseStreamItemIfNeed(item);
        }
        let items = new Array();
        let output = new Array();
        let jsons = item.split('}{');
        for (let i = 0; i < jsons.length; i++) {
            let item = jsons[i] as any;
            item = i === 0 ? `${item}}` : `{${item}`;
            if (!ObjectUtil.isJSON(item)) {
                continue;
            }
            item = this.parseStreamItemIfNeed(JSON.parse(item));
            if (!_.isEmpty(item.output)) {
                output = item.output;
            }
            items.push(item);
        }
        let last = _.last(items);
        if (_.isEmpty(last.output)) {
            last.output = output;
        }
        return last;
    }

    private parseStreamItemIfNeed(item: any): any {
        if (StableClient.isStreamProgress(item) && !_.isEmpty(item.output)) {
            item.output = item.output.map(item => {
                return { path: `${this.url}${item.path}?r=${RandomUtil.randomNumber(0, 1000000)}` }
            })
        }
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------

    public async ping(): Promise<IPingDtoResponse> {
        return this.call<IPingDtoResponse>(PING_URL);
    }

    public async models(): Promise<IStableImageModelDetails> {
        let { options } = await this.call(MODELS_URL, { data: { scan_for_malicious: false } });
        return {
            vaes: options.vae,
            loras: options.lora,
            models: options['stable-diffusion'],
        }
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
        catch (error: any) {
            if (error.code !== 425) {
                throw error;
            }
        }
        return this.parseStream(item);
    }

    public getImageUrl(id: number, index: number): string {
        return `${this.url}${IMAGE_URL}/${id}/${index}`;
    }
}

const PREFIX = '/';

export const PING_URL = PREFIX + 'ping';
export const MODELS_URL = PREFIX + 'get/models';
export const RENDER_URL = PREFIX + 'render';
export const IMAGE_URL = PREFIX + 'image/tmp';
export const STOP_URL = PREFIX + 'image/stop';
export const STREAM_URL = PREFIX + 'image/stream';

