import { IRenderRequest, IRenderResponse } from "./IRenderDto";

export interface IStreamProgress {
    step: number,
    step_time: number,
    total_steps: number
}
export interface IStreamResult {
    status: StreamResultStatus,
    detail?: string,
    output: Array<IRenderResponse>;
    render_request: IRenderRequest;
}

export enum StreamResultStatus {
    FAILED = 'failed',
    SUCCEEDED = 'succeeded'
}

export type StreamDtoResponse = IStreamProgress | IStreamResult;