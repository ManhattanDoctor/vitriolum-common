import { IRenderOutput, IRenderRequest } from "./IRenderDto";

export interface IStreamProgress {
    step: number,
    step_time: number,
    total_steps: number,
    output?: Array<{ path: string }>;
}
export interface IStreamResult {
    status: StreamResultStatus,
    detail?: string,
    output: Array<IRenderOutput>;
    render_request: IRenderRequest;
}

export enum StreamResultStatus {
    FAILED = 'failed',
    SUCCEEDED = 'succeeded'
}

export type StreamDtoResponse = IStreamProgress | IStreamResult;