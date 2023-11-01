import { DateUtil, Loadable, LoadableStatus, ObservableData } from "@ts-core/common";
import { Observable, filter, map } from "rxjs";
import * as _ from 'lodash';

export abstract class AiTask<U, V> extends Loadable<AiTaskEvent, AiTaskEventDto>  {
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    protected _timer: any;
    protected _progress: IAiTaskProgress;
    protected progressDelay: number;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(progressDelay?: number) {
        super();
        if (_.isNil(progressDelay)) {
            this.progressDelay = DateUtil.MILLISECONDS_SECOND;
        }
    }

    // --------------------------------------------------------------------------
    //
    //  Protected Methods
    //
    // --------------------------------------------------------------------------

    protected async progressCheck(): Promise<void> {
        this._progress = await this.progressGet();
        if (!_.isNil(this.progress)) {
            this.observer.next(new ObservableData(AiTaskEvent.PROGRESSED, this.progress));
        }
    }

    protected abstract progressGet(): Promise<IAiTaskProgress>;

    // --------------------------------------------------------------------------
    //
    //  Event Handlers
    //
    // --------------------------------------------------------------------------

    protected commitStatusChangedProperties(oldStatus: LoadableStatus, newStatus: LoadableStatus): void {
        super.commitStatusChangedProperties(oldStatus, newStatus);
        this.timer = newStatus === LoadableStatus.LOADING ? setInterval(this.progressCheckHandler, this.progressDelay) : null;
    }

    protected progressCheckHandler = (): Promise<void> => this.progressCheck();

    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------

    public abstract run(params: U): Promise<V>;

    public abstract abort(): Promise<void>;

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.timer = null;
        this._progress = null;
    }

    // --------------------------------------------------------------------------
    //
    //  Protected Properties
    //
    // --------------------------------------------------------------------------

    protected get timer(): any {
        return this._timer;
    }
    protected set timer(value: any) {
        if (value === this._timer) {
            return;
        }
        if (!_.isNil(this._timer)) {
            clearInterval(this._timer);
        }
        this._timer = value;
    }

    // --------------------------------------------------------------------------
    //
    //  Public Properties
    //
    // --------------------------------------------------------------------------

    public get progress(): IAiTaskProgress {
        return this._progress;
    }
    public get progressed(): Observable<IAiTaskProgress> {
        return this.events.pipe(
            filter(item => item.type === AiTaskEvent.PROGRESSED),
            map(item => item.data as IAiTaskProgress)
        );
    }
}

export enum AiTaskEvent {
    PROGRESSED = 'PROGRESSED'
}
export interface IAiTaskProgress<T = string> {
    data?: T;
    total?: number;
    percent?: number;
    current?: number;
}
export type AiTaskEventDto = IAiTaskProgress;